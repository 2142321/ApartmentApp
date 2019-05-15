const config = require("./config/config.json");
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const auth = require("./routes/auth");
const logger = require("tracer").dailyfile({
  root: "./logs",
  maxLogFiles: 10,
  allLogsFileName: "Apartment",
  format: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
  dateformat: "HH:MM:ss.L"
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middelware, logging voor alle request
app.all("*", function(req, res, next) {
  logger.info("%s", req.hostname);
  next();
});

// Routing without JWT
app.use("/auth", auth);

// Routing protected by JWT
app.use("/api", api);

// Optional log error
function errorLoggerHandler(err, req, res, next) {
  logger.error("%s", err.message);
  next(err);
}

// Set default error handler
function errorResponseHandler(err, req, res, next) {
  res.status(500);
  res.json({ mgs: err.message });
  console.log(err)
}

// Register the error handlers
app.use(errorLoggerHandler);
app.use(errorResponseHandler);

// ECMA 6
const port = process.env.PORT || config.remote.port;
const server = app.listen(port, () => {
  console.log(
    "Connected at port " + server.address().port
  );
});

module.exports = app;