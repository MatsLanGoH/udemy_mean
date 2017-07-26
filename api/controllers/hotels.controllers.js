// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');

// use Native Promise
mongoose.Promise = global.Promise;

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

  // Default values
  var offset = 0;
  var count = 5;
  var maxCount = 20;

  // Check if query string contains lat/long params
  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  // Get values for pagination from query if they exist
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  // Return error if invalid query params
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "query parameters count and offset should be given as numbers."
      });
    return;
  }

  // Return error if invalid count number
  if (count > maxCount) {
    res
      .status(500)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  // Query model
  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found " + hotels.length + " hotels.");
        res.json(hotels);
      }
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
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 500;
        response.message = {
            "message" : "Hotel ID not found"
          };
      }
      res
        .status(response.status)
        .json(response.message);
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
