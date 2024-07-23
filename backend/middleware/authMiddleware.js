const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const User =require("../models/userModel")

config();

module.exports.protectUser = async function protectUser(req, res, next) {
    const token = req.cookies['authToken'];
    console.log('Auth Token:', token);
    if (!token) {
        return res.status(401).json({ message: "You are not logged in. Please login." });
    }

    try {
        const myPayLoad = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Payload:', myPayLoad); 
        
        if (myPayLoad) {
            const user = await User.findById(myPayLoad.payload);
            console.log('User:', user); 
            if (user) {
                req.role = user.role;
                req.id = user._id;
                next();
            } else {
                res.status(404).json({ message: 'User not authorized for this operation' });
            }
        } else {
            res.status(401).json({ message: 'User not verified' });
        }
    } catch (err) {
        console.error('Error in protectUser:', err.message);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

module.exports.isAuthorised=function isAuthorised(roles){
    return async function(req,res,next){
        const token = req.cookies['authToken'];
        console.log('Auth Token:', token);
        if (!token) {
            return res.status(401).json({ message: "You are not logged in. Please login." });
        }
        try {
            const myPayLoad = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Payload:', myPayLoad); 
            if (myPayLoad) {
                const user = await User.findById(myPayLoad.payload);
                console.log('User:', user); 
                if (roles.includes(user.role)==true) {
                    next();
                } 
                else {
                    res.status(404).json({ message: 'User not authorized for this operation' });
                }
            } 
            else {
                res.status(401).json({ message: 'User not verified' });
            }
        } catch (err) {
            console.error('Error in protectUser:', err.message);
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }
        
}
