var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json');

module.exports.getAllHotels = function (req, res) { // Controller

  var db = dbconn.get();

  console.log("db", db);

  console.log("GET the json");
  console.log(req.query);

  // Get values for pagination from query (or use default if none given)
  var offset = parseInt(req.query.offset) || 0;
  var count = parseInt(req.query.count) || 5;

  var returnData = hotelData.slice(offset, offset + count);

  res
    .status(200)
    .json(returnData);
};

module.exports.getSingleHotel = function (req, res) {
  var hotelId = req.params.hotelId;
  var hotelJson = hotelData[hotelId];

  console.log("GET hotelId", hotelId);
  res
    .status(200)
    .json(hotelJson);
};

module.exports.addSingleHotel = function (req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
}
