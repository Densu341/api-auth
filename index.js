const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.APPLICATION_PORT || 3000;

app.get("/", (req, res) => {
  res.send("API Start up and Running!");
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
