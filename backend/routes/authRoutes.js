const express = require("express");
const useragent = require("useragent"); // 📌 Detects browser & OS info
const User = require("../models/User"); // User model
const LoginActivity = require("../models/LoginActivity"); // New model for storing logins

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

// 🔹 Login User (With Device Fingerprinting & Alerts)
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password!" });
        }

        // 📌 Get login details
        const agent = useragent.parse(req.headers["user-agent"]);
        const deviceInfo = {
            browser: agent.family,
            os: agent.os.toString(),
            device: agent.device.toString(),
            ip: req.ip || req.connection.remoteAddress,
            timestamp: new Date(),
        };

        // 🗄️ Store login activity
        const loginRecord = new LoginActivity({ username, ...deviceInfo });
        await loginRecord.save();

        // 🚨 Detect unusual activity
        const previousLogins = await LoginActivity.find({ username }).sort({ timestamp: -1 }).limit(5);

        let alertMessage = null;
        if (previousLogins.length > 1) {
            const lastLogin = previousLogins[1]; // Previous login
            if (lastLogin.ip !== deviceInfo.ip || lastLogin.device !== deviceInfo.device) {
                alertMessage = `⚠️ Unusual login detected from ${deviceInfo.device} (${deviceInfo.ip})`;
            }
        }

        res.status(200).json({
            message: "Login successful!",
            alert: alertMessage,
            loginDetails: deviceInfo,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Fetch Login History for a User
router.get("/login-history/:username", async (req, res) => {
    try {
        const { username } = req.params;

        // Fetch last 10 login records (newest first)
        const loginHistory = await LoginActivity.find({ username }).sort({ timestamp: -1 }).limit(10);

        res.status(200).json(loginHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;