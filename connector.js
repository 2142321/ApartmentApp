const mysql = require('mysql')
const config = require('./config/config.json')
const logger = require("tracer").colorConsole();

const reconnectTimeout = 2000; // ms.

const connectionSettings = {
  connectionLimit: 20,
  // host: process.env.DB_HOST || config.remote.dbServer,
  // user: process.env.DB_USER || config.remote.dbUsername,
  // password: process.env.DB_PASSWORD || config.remote.dbPassword,
  // database: process.env.DB_SCHEMA || config.remote.dbSchema,
  host: config.remote.dbServer,
  user: config.remote.dbUsername,
  password: config.remote.dbPassword,
  database: config.remote.dbSchema,
  port: 3306,
  debug: false
};

var pool;

pool = mysql.createPool(connectionSettings);

pool.on("acquire", connection => {
  logger.trace("Connection %d acquired", connection.threadId);
});

pool.on("connection", connection => {
  logger.trace("Connection to database was made");
});

pool.on("enqueue", () => {
  logger.trace("Waiting for available connection slot");
});

pool.on("release", connection => {
  logger.trace("Connection %d released", connection.threadId);
});

module.exports = pool;
