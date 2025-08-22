const express = require("express");
const User = require("../models/User"); // Import the User model
const bcrypt = require("bcryptjs"); // Import bcrypt for password comparison
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Save the user to the database (password will be hashed automatically)
    await user.save();
    
    // Send a success response
    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // This secret key is from the .env file
      { expiresIn: 3600 }, // Token will expire in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { name: user.name, email: user.email } }); // name aur email add karo
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;