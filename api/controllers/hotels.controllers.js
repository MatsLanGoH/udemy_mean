var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {  // Controller
      console.log("GET the json");
      res
        .status(200)
        .json( hotelData );
  };
