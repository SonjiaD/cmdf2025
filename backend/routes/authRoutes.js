const express = require("express");
const User = require("../models/User"); // Import User model

const router = express.Router();

// 🔹 Register User
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already taken!" });

        // Save user (⚠️ Plain-text passwords are not secure, but you asked for no bcrypt)
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Login User
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in database
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username or password!" });

        // Compare passwords (plain text check)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password!" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
