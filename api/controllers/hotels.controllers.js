var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');

module.exports.getAllHotels = function (req, res) { // Controller

  // Connect to database
  var db = dbconn.get();
  var collection = db.collection('hotels');

  // Get values for pagination from query (or use default if none given)
  var offset = parseInt(req.query.offset) || 0;
  var count = parseInt(req.query.count) || 5;

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found hotels", docs);
      res
        .status(200)
        .json(docs);
    });

};

module.exports.getSingleHotel = function (req, res) {

  // Connect to database
  var db = dbconn.get();
  var collection = db.collection('hotels');

  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);

  // Retrieve result for given Id.
  collection
    .findOne({
      _id : ObjectId(hotelId)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
    })

};

module.exports.addSingleHotel = function (req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
}
