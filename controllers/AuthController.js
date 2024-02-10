const { Users } = require("../models");

exports.registerUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.password_confirm) {
      return res.status(400).json({
        message: "Validation error",
        error: ["Passwords do not match"],
      });
    }

    const newUser = await Users.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.errors.map((err) => err.message),
    });
  }
};
