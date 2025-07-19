const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/auth");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  authController.signup
);

// Login route
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  authController.login
);

// TEMP: Test reading db.json
router.get("/test", (req, res) => {
  try {
    const dbPath = path.resolve(__dirname, "../db.json");
    const users = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    res.json(users);
  } catch (error) {
    console.error("Test route error:", error);
    res.status(500).json({ error: "Failed to load users" });
  }
});
module.exports = router;