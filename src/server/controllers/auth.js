const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const dbPath = path.join(__dirname, "../db.json");

const readUsers = () =>
  JSON.parse(fs.readFileSync(dbPath, "utf-8"));

const writeUsers = (users) =>
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

// SIGNUP
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;
  const users = readUsers();

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User created successfully" });
};

// LOGIN
exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "devsecret", {
    expiresIn: "1h",
  });

  res.json({ token });
};