const express   = require('express')
const assert = require('assert')
const router    = express.Router()
//const Movie
const db = require('../connector.js')
const jwt = require('../helpers/jwt')

router.all("*", function(req, res, next) {
    assert(
      typeof req.headers["x-access-token"] == "string",
      "token is not a string!"
    );
  
    const token = req.header("X-Access-Token") || "";
  
    jwt.decodeToken(token, (err, payload) => {
      if (err) {
        console.log("Error handler: " + err.message);
        next(err);
      } else {
        next();
      }
    });
  });

router.get('/appartments', (req, res)=> {
    const query = {
        sql: `SELECT apartment.StreetAddress, apartment.PostalCode, apartment.City, user.FirstName, user.LastName, user.DataOfBirth, reservation.ReservationId FROM apartment LEFT JOIN reservation ON apartment.ApartmentId = reservation.ApartmentId LEFT JOIN user ON apartment.UserId = user.UserId`,
        timeout: 2000
    };
    //Perform query
    db.query(query, (err, result, fields) => {
        if (err) throw err
        res.status(200).json(result);
    });
})

router.post('/appartments', (req, res)=> {
    var query = 'INSERT INTO apartment (Description, StreetAddress, PostalCode, City, UserId) ' 
    query += 'VALUES ("' + req.body.Description + '", "' + req.body.StreetAddress + '", "' + req.body.PostalCode + '", "' + req.body.City + '", '
        + req.body.UserId + ')'

    db.query(query, (err, result, fields) => {
        if (err) throw err
        res.status(200).json('Apartment succesfully added');
    });  
})

router.get('/appartments/:id', (req, res)=> {
    let id = req.params.id
    var query = 'SELECT * FROM apartment where ApartmentId=' + id;
    db.query(query, (err, result, fields) => {
        if (err) throw err
        res.status(200).json(result);
    });  
});

router.put('/appartments/:id', (req, res)=> {
    let id = req.params.id
    var query = ' UPDATE apartment' +
    ' SET Description=\"' + req.body.Description + '", ' + 
    ' StreetAddress="' + req.body.StreetAddress + '", ' +
    ' PostalCode="' + req.body.PostalCode + '", ' +
    ' City="' + req.body.City + '", ' +
    ' UserId="' + req.body.UserId + '" ' +
    ' where AppartmentId=' + id;
    db.query(query, (err, result, fields) => {
        if (err) throw err
        res.status(200).json('Apartment succesfully updated');
    });  
})

router.get('/appartments/:id/reservations', (req, res)=> {
    let id = req.params.id
    var query = 'SELECT * FROM reservation where ApartmentId=' + id;
    db.query(query, (err, result, fields) => {
        if (err) throw err
        res.status(200).json(result);
    });  
});

router.get('/appartments/:id/reservations/:resid', (req, res)=> {
    let id = req.params.id
    let resid = req.params.resid
    var query = 'SELECT * FROM reservation where ApartmentId=' + id + ' AND ReservationId=' + resid;
    db.query(query, (err, result, fields) => {
        if (err) throw err
        res.status(200).json(result);
    });  
});

router.delete('/api/appartments /:id', (res, req)=> {

})
module.exports = router;