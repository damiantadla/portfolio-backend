const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//process.env.ACCESS_TOKEN;
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (password.length < 6)
    return res.status(400).json({ message: "Password less than 6 characters" });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    }).then(() =>
      res.status(200).json({ message: "Users created successfully" }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username or password not present" });
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(400)
        .json({ message: "Login failed", error: "User not found" });
    }

    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const maxAge = 3600;
        const token = jwt.sign(
          { id: user.id, email, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: maxAge },
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
          secure: true,
        });
        res.status(200).json({ message: "Login successful", user });
      } else {
        res
          .status(400)
          .json({ message: "Login failed", error: "Incorrect password" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, path: "/" });
    return res.status(200).json({ message: "Successful logout" });
  } catch (err) {
    console.log("Error when logout:", err);
    return res.status(500).json({ error: "Failed to logout" });
  }
};

const update = async (req, res) => {
  const { role, id } = req.body;
  if (role && id) {
    if (role === "admin") {
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== "admin") {
          user.role = role;
          await user.save();
          res.status(200).json({ message: "Role updated successfully" });
        } else {
          res.status(400).json({ message: "User already has admin role" });
        }
      } catch (err) {
        res
          .status(500)
          .json({ message: "An error occurred", error: err.message });
      }
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } else {
    res.status(400).json({ message: "Role or ID not present" });
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getUser,
  register,
  login,
  logout,
  update,
};
