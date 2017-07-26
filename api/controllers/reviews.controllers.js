var mongoose = require('mongoose');

// use Native Promise
mongoose.Promise = global.Promise;

var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
module.exports.getAllReviews = function(req, res) {

  // Get hotelId from request params
  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);

  // Retrieve result for given Id.
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      res
        .status(200)
        .json(doc.reviews);
    });
};

// GET a single review for a hotel
module.exports.getSingleReview = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
        console.log("Returned hotel", hotel);
        var review = hotel.reviews.id(reviewId);
        res
          .status(200)
          .json(review);
    });

};
