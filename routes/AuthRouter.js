const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../controllers/AuthController");
const { authMiddleware } = require("../middleware/UserMiddleware");

router.post("/register", registerUser);
router.post("/", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getMe);

module.exports = router;
