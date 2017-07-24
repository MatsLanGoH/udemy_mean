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
        .status(201)
        .json(response.ops);
    })

  } else {
    console.log("Data missing from POST request");
    res
      .status(400)
      .json({message : "Required data missing from body"});
  }
}
