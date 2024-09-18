const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authModel = require("../models/Auth");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const sendEmail = require("../utils/nodeMailer");
require("dotenv").config();

// create a user
router.post(
  "/createUser",
  [
    body("name", "Enter your name").isString(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 8 to 20 characters long").isLength({
      min: 8,
      max: 20,
    }),
    body("mobileNumber", "Enter a valid mobile number")
      .isLength({ min: 10, max: 10 })
      .optional(),
    body("role", "Choose a valid role").isString().optional(),
  ],
  async (req, res) => {
    // Validate incoming request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mobileNumber, role } = req.body;

    try {
      // Check if the user already exists
      let user = await authModel.findOne({ email });
      if (user) {
        return res
          .status(403)
          .json({ error: "Account already exists with this email" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      user = new authModel({
        name,
        email,
        password: hashedPassword,
        mobileNumber: mobileNumber || null,
        role: role || "user",
      });

      // Save the user to the database
      await user.save();

      // Create and return JWT token
      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Login user
router.post(
  "/login",
  [
    body("email", "Enter your email").isEmail(),
    body("password", "Enter your password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if the user exists
      let user = await authModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Account not found!" });
      }

      // Compare passwords
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create and return JWT token
      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const subject = "logged in";
      const text = "someone logged in with this account just now";
      const html = `if this is not you, please submit a query request at nimble2905@gmail.com`;
      await sendEmail(email, subject, text, html);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
);

// get user data
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch the user by ID, excluding the password
    const user = await authModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user data, without password
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
