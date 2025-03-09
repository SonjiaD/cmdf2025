// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// POST request to register a user
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    // You would typically save this information to your database here
    // For now, we'll just send a success message
    res.json({ message: "User registered successfully" });
});

module.exports = router;
