const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
const categoriesRouter = require("./app/api/v1/categories/router");
const v1 = "/api/v1/cms";

//middleware
const notFoundMiddleware = require("./app/middlewares/not-found");
const handlerErrorMiddleware = require("./app/middlewares/handler-error");

app.use(v1, categoriesRouter);

app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API Semina",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
