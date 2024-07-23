const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { config } = require('dotenv');

config();

module.exports.register = async function register(req, res) {
    try {
        const obj = req.body;

        const userExists = await User.findOne({ email: obj.email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(obj.password, 12);

        const newUser = new User({ ...obj, password: hashedPassword });

        await newUser.save();

        return res.status(200).json({ message: "User registered successfully! Please login" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports.login = async function login(req, res) {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid Credentials"
            });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (passwordMatched) {
            let uid = user['_id'];
            let token = jwt.sign({ payload: uid }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 });
            res.status(200).json({
                message: "User logged in successfully",
                role: user.role
            });
        } else {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error logging in',
            error: err
        });
    }
};

module.exports.logout = function logout(req, res) {
    res.cookie('authToken', '', { httpOnly: true, secure: process.env.NODE_ENV === "production", expires: new Date(0) });
    res.status(200).json({
        message: 'User logged out successfully'
    });
};
