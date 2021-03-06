const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("../models/user");
const db = require("../connector.js");
const bcrypt = require("bcryptjs");
const jwt = require("../helpers/jwt");

const saltRounds = 10;

// Register new user
router.post("/register", (req, res, next) => {
  try {
    // Validate with assert is string etc ..
    assert(typeof req.body.first_name  === "string", " is not a string!");
    assert(typeof req.body.last_name  === "string", " is not a string!");
    assert(typeof req.body.street_address  === "string", " is not a string!");
    assert(typeof req.body.postal_code  === "string", " is not a string!");
    assert(typeof req.body.city  === "string", " is not a string!");
    assert(typeof req.body.date_of_birth  === "string", " is not a string!");
    assert(typeof req.body.phone_number  === "string", " is not a string!");
    assert(typeof req.body.email === "string", "Email is not a string!");
    assert(typeof req.body.password === "string", "Password is not a string!");

    // Create new user object, hash password (do not store in db).
    // Throws err if no valid object can be constructed
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User(req.body.first_name, req.body.last_name, req.body.street_address, req.body.postal_code, req.body.city, req.body.date_of_birth, req.body.phone_number, req.body.email, hash);

    // Construct query object
    const query = {
      sql: "INSERT INTO `user`(FirstName, LastName, StreetAddress, PostalCode, City, DataOfBirth, PhoneNumber, EmailAddress, Password) VALUES (?,?,?,?,?,?,?,?,?)",
      values: [user.firstName, user.lastName, user.streetAddress, user.postalCode, user.city, user.dateOfBirth, user.phoneNumber, user.email, hash],
      timeout: 2000
    };

    // Perform query
    db.query(query, (err, rows, fields) => {
      if (err) {
        logger.error(err);
        next(err);
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (ex) {
    next(ex);
  }
});

// Login with username and password
router.post("/login", function(req, res, next) {
  try {
    // Validate with assert is string etc ..
    assert(typeof req.body.email === "string", "Email is not a string!");
    assert(typeof req.body.password === "string", "Password is not a string!");

    const query = {
      sql: "SELECT Password FROM user WHERE EmailAddress=?",
      values: [req.body.email],
      timeout: 2000
    };

    db.query(query, (err, rows, fields) => {
      if (err) {
        next(err);
      } else {
        console.log(rows[0].Password)
        if (
          rows.length === 1 &&
          bcrypt.compareSync(req.body.password, rows[0].Password)
        ) {
          token = jwt.encodeToken(req.body.email);
          res.status(200).json({ token: token });
        } else {
          next(new Error("Invalid login!"));
        }
      }
    });
  } catch (ex) {
    next(ex);
  }
});

// Fall back, display some info
router.all("*", function(req, res, next) {
  next(new Error("Unknown endpoint"));
});

module.exports = router;