const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const userModel = require('../models/userModel');  // abstraction for DB functions

// ✅ Signup Controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save new user
    await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'Signup successful' });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Signup failed', error });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};
