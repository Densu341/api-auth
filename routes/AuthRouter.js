const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/AuthController");

router.post("/register", registerUser);

module.exports = router;
