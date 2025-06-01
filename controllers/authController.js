// D:\tender_intelligence_app\backend\controllers\authController.js

import User from '../models/User.js'; // Import our new PostgreSQL User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token will expire in 1 hour
  });
};

// Controller function for user registration (signup)
export const registerUser = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user using the User model's create function
    const newUser = await User.create(email, password); // Password hashing is handled within the User model
    const token = generateToken(newUser.id); // Generate token for the new user
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Controller function for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Find the user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' }); // User not found
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Passwords do not match
    }

    console.log("111");
    const token = generateToken(user.id); // Generate token for the logged-in user
    console.log("222");
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};