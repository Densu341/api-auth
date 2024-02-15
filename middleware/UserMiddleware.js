const jwt = require("jsonwebtoken");
const { Users } = require("../models");

// middleware can be use on protect routes
exports.authMiddleware = async (req, res, next) => {
  // get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized Access",
    });
  }

  // decode verifikasi token
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      res.status(401).json({
        error: err,
        message: "Invalid Token",
      })
    );
  }

  // get user by decoded condition
  const currentUser = await Users.findByPk(decoded.id);

  if (!currentUser) {
    return res.status(401).json({
      status: 401,
      message: "User not found",
    });
  }

  console.log("currentUser", currentUser);
  req.user = currentUser;

  next();
};
