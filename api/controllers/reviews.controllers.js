var mongoose = require('mongoose');

// use Native Promise
mongoose.Promise = global.Promise;

var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
module.exports.getAllReviews = function (req, res) {

  // Get hotelId from request params
  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);

  // Retrieve result for given Id.
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, doc) {
      if (err) {
        res
          .status(500)
          .json({
            message: "Hotel ID not found"
          });
      } else if (!doc) {
        res
          .status(404)
          .json({
            message: "Hotel ID not found " + hotelId
          });
      } else {
        res
          .status(200)
          .json(doc.reviews);
      }
    });
};

// GET a single review for a hotel
module.exports.getSingleReview = function (req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, hotel) {
      var response = {
        status: 200,
        message: {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        response.status = 404;
        response.message = {
          message: "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        response.message = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            message: "Review ID not found " + reviewId
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });
};


// Helper method to add a review to a hotel
var _addReview = function(req, res, hotel) {

  hotel.reviews.push({
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });

  hotel.save(function(err, updatedHotel) {
    if (err) {
      console.log("Error adding a review");
      res
        .status(500)
        .json(err)
    } else {
      res
        .status(201)
        .json(updatedHotel.reviews[updatedHotel.reviews.length - 1]);
    }
  });
};


// Adds a review to a Hotel
module.exports.addSingleReview = function (req, res) {
  var hotelId = req.params.hotelId;

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, hotel) {
        var response = {
          status: 200,
          message: {}
        };
        if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
        } else if (!hotel) {
          response.status = 404;
          response.message = {
            message: "Hotel ID not found " + hotelId
          };
        }

        // If we have a hotel object, let's add a review.
        if (hotel) {
          _addReview(req, res, hotel);
        } else {
          res
            .status(response.status)
            .json(response.message);
        }
    });
}


