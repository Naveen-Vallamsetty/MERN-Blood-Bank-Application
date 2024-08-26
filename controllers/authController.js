const mongoose = require("mongoose");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registration
const registerController = async (req, res) => {
  try {
    const exisitingUser = await User.findOne({ email: req.body.email });
    // validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // rest data
    const user = new User(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// login

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("login user", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role doesn't match",
      });
    }
    // compare passowrd
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// Get Current User

const currentUserController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
