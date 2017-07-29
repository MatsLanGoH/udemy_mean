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

// Update a review
module.exports.updateSingleReview = function (req, res) {
  // Get review ID
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        console.log("Hotel ID not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found" + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // if the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }

      // Bail here if we had a problem
      if (response.status != 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        // Get data from body and save to the document
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;

        hotel.save(function (err, updatedHotel) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 204;
          }
          res
            .status(response.status)
            .json(response.message);
        });
      }
    });
};


// Delete a review
module.exports.deleteSingleReview = function (req, res) {
  // Get review and hotel ID
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };

      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        console.log("Hotel ID not found in database: ", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose return null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        };
      }

      // Bail here if we had a problem
      if (response.status != 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        // Remove the subdocument and save the parent
        thisReview.remove();
        hotel.save(function (err) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            // console.log("Review removed");
            response.status = 204;
          }
          res
            .status(response.status)
            .json(response.message);
        });
      }
    })
};
