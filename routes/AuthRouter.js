const express = require("express");
const router = express.Router();

express.Router();

router.post("/register", (req, res) => {
  res.send("testing");
});

module.exports = router;
