const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // For JWT authentication
const axios = require('axios'); // For reCAPTCHA verification
const User = require('./models/User'); // Import User model

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// 🔹 Register User (No Hashing)
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already taken!" });

        // Save user (⚠️ Plain text password - NOT SECURE for production)
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Login User with reCAPTCHA and JWT
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password, recaptchaToken } = req.body;

        // Verify reCAPTCHA token
        const recaptchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            {},
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                },
            }
        );

        if (!recaptchaResponse.data.success) {
            return res.status(400).json({ message: "reCAPTCHA verification failed!" });
        }

        // Find user in database
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password!" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
