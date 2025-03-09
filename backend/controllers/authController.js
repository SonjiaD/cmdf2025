const jwt = require('jsonwebtoken');  // ✅ Only declare this once at the top
const bcrypt = require('bcryptjs');

// Dummy in-memory users (replace this with a database in production)
let users = [];

// Register a new user
exports.register = async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user (in memory for this example)
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Generate JWT token (user is defined here)
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};
