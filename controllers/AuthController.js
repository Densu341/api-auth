const { Users } = require("../models");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
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

    createSendToken(newUser, 201, res);
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
  createSendToken(userData, 200, res);
};

exports.logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now(0)),
    httpOnly: true,
  });
  res.status(200).json({ status: "logout success" });
};

exports.getMe = async (req, res) => {
  const user = await Users.findByPk(req.user.id);

  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role_id: user.role_id,
      },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "User not found",
  });
};
