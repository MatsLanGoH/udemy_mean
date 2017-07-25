var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels.controllers.js');
var reviewController = require('../controllers/reviews.controllers.js');

// Hotel routes
router
  .route('/hotels')
  .get(hotelController.getAllHotels);

router
  .route('/hotels/:hotelId')
  .get(hotelController.getSingleHotel);

router
  .route('/hotels/new')
  .post(hotelController.addSingleHotel);

// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(reviewController.getAllReviews);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(reviewController.getSingleReview);

module.exports = router;
