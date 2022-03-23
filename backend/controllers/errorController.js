const fs = require("fs");
const HttpError = require("../models/http-error");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}.`;
  return new HttpError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new HttpError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new HttpError(message, 400);
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  if (req.files) {
    req.files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  if (res.headerSent) {
    return next(err);
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || `An unknown error occurred`;

  console.log(err);

  let error = err;
  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") {
    error = handleValidationErrorDB(error);
  }
  sendErrorProd(error, res);
};
