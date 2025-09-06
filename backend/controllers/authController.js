const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'AnjaliNavgire';

// ---------------- SIGNUP ----------------
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
