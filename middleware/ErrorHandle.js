// not found error
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// global error handler
exports.errorHandler = (err, req, res, next) => {
  // if not add status code
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.errors || err.name === "SequelizeValidationError") {
    const errorList = err.e.errors.map((e) => {
      let list = {};
      list[e.path] = e.message;
      return list;
    });
    message = errorList;
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    stack: err.stack,
  });

  next();
};
