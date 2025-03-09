const mongoose = require("mongoose");

const loginActivitySchema = new mongoose.Schema({
    username: { type: String, required: true },
    browser: String,
    os: String,
    device: String,
    ip: String,
    timestamp: { type: Date, default: Date.now },
});

const LoginActivity = mongoose.model("LoginActivity", loginActivitySchema);
module.exports = LoginActivity;