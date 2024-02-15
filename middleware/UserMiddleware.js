const jwt = require("jsonwebtoken");
const { Users, Role } = require("../models");

// middleware can be use on protect routes
exports.authMiddleware = async (req, res, next) => {
  // get token
  let token;
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     token = req.headers.authorization.split(" ")[1];
  //   }
  token = req.cookies.jwt;

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

  req.user = currentUser;

  next();
};

// example :
// const { authMiddleware } = require("../middleware/UserMiddleware");
// router.post("/reserve", authMiddleware, ReservRoom);

exports.permissionUser = (...roles) => {
  return async (req, res, next) => {
    const rolesData = await Role.findByPk(req.user.role_id);
    const userRole = rolesData.nama_role;

    if (!roles.includes(userRole)) {
      return next(
        res.status(403).json({
          status: 403,
          message: "Forbidden Access",
        })
      );
    }

    next();
  };
};

// example :
// const { permissionUser } = require("../middleware/UserMiddleware");
// router.post("/transaction", authMiddleware, permissionUser("admin"), Transaction);
