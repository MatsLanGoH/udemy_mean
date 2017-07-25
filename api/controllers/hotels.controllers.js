// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {

  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // A geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };

  var geoOptions = {
    spherical : true,
    maxDistance : 2000,  // max distance in meters
    num : 5  // max number of results
  };

  Hotel
    .geoNear(point, geoOptions, function(err, result, stats) {
      console.log('Geo results', result);
      console.log('Geo stats', stats);
      res
        .status(200)
        .json(result);
    });
};


// Returns json for all hotels in db
module.exports.getAllHotels = function (req, res) { // Controller

  // Check if query string contains lat/long params
  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  // Get values for pagination from query (or use default if none given)
  var offset = parseInt(req.query.offset) || 0;
  var count = parseInt(req.query.count) || 5;

  // Query model
  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      console.log(hotels);
      res.json(hotels);
    });
};

// Returns json for a single hotel.
module.exports.getSingleHotel = function (req, res) {

  // Get hotelId from request params
  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);

  // Retrieve result for given Id.
  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      res
        .status(200)
        .json(doc);
    });
};

// Adds a single hotel to the db
module.exports.addSingleHotel = function (req, res) {
  // Connect to database
  var db = dbconn.get();
  var collection = db.collection('hotels');
  var newHotel;

  console.log("POST new hotel");
  if (req.body && req.body.name && req.body.stars) {

    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);

    console.log(newHotel);
    collection.insertOne(newHotel, function(err, response) {
      console.log(response);
      res
        .status(200)
        .json(newHotel);
    })

  } else {
    console.log("Data missing from POST request");
    res
      .status(400)
      .json({message : "Required data missing from body"});
  }
}
