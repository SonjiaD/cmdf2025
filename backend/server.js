const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Import mongoose
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes

// POST API to Register User
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already taken!" });

        // Hash password before storing
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to database
        const newUser = new User({ username, password: password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const User = require('./models/User');

// Test Insert (Run this once)
const createTestUser = async () => {
    try {
        const testUser = new User({
            username: "testuser",
            password: "hashedpassword123"
        });

        await testUser.save();
        console.log("✅ Users collection created with a test user!");
    } catch (error) {
        console.log("❌ Error creating collection:", error);
    }
};

// Run the function
// createTestUser();

