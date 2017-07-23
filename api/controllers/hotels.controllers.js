var hotelData = require('../data/hotel-data.json');

module.exports.getAllHotels = function (req, res) { // Controller
  console.log("GET the json");
  res
    .status(200)
    .json(hotelData);
};

module.exports.getSingleHotel = function (req, res) {
  var hotelId = req.params.hotelId;
  var hotelJson = hotelData[hotelId];
  console.log("GET hotelId", hotelId);
  res
    .status(200)
    .json(hotelJson);
};
