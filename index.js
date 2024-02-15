const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.APPLICATION_PORT || 3000;
dotenv.config();
const authRouter = require("./routes/AuthRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middleware/ErrorHandle");

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Start up and Running!");
});

// routing
app.use(`/api/v1/auth`, authRouter);

// not found
app.use(notFound);
// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
