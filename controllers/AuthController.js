const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

    const token = signToken(newUser.id);

    return res.status(201).json({
      message: "User created successfully",
      token,
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.errors.map((err) => err.message),
    });
  }
};

exports.loginUser = async (req, res) => {
  // 1) check fungsi validasi
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: "Fail",
      message: "Validation error",
      error: "Please Input Email or Password",
    });
  }

  // 2) check apakah email ada dan password sudah benar
  const userData = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (
    !userData ||
    !(await userData.CorrectPassword(req.body.password, userData.password))
  ) {
    return res.status(400).json({
      status: "Fail",
      message: "Error Login",
      error: "Invalid Email or Password",
    });
  }

  // 3) return token
  const token = signToken(userData.id);
  return res.status(200).json({
    status: "Success",
    message: "Login Success",
    token,
  });
};
