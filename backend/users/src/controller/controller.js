const { User } = require("../models/useModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECRET_KEY;

// console.log("ENV", );

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, pass } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPass = await bcrypt.hash(pass, 10);

    const newUser = new User({
      name,
      email,
      phone,
      pass: hashPass,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // localStorage.setItem("token", token);

    res.status(201).json({ message: "User registered successfully", token });
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

    // localStorage.setItem("token", token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
