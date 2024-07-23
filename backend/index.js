const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const StripeRoute = require('./routes/stripeRoute');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const subscriberRoute = require("./routes/subscriberRoute");
const authRouter = require('./routes/authRoutes');
const productRoute = require('./routes/productRouter');
const cookieParser = require('cookie-parser');
const userRouter=require('./routes/userRoute');

dotenv.config();
connectDB();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: [process.env.FRONTEND_URL], // Use the URL from .env
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use("/api/product", productRoute);
app.use('/stripe', StripeRoute);
app.use('/subscriber', subscriberRoute);
app.use('/auth', authRouter);
app.use('/user',userRouter);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use((req, res, next) => {
    req.cloudinary = cloudinary;
    next();
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

const parser = multer({ storage: storage });

// Route for uploading the file to Cloudinary
app.post('/upload-image', parser.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        if (!req.file.path) {
            throw new Error('File uploaded, but no path available');
        }

        res.json({ secure_url: req.file.path });
    } catch (error) {
        console.error('Error during file upload: ', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running perfectly on port', process.env.PORT || 5000);
});
