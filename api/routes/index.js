var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels.controllers.js');
var reviewController = require('../controllers/reviews.controllers.js');

// Hotel routes
router
  .route('/hotels')
  .get(hotelController.getAllHotels)
  .post(hotelController.addSingleHotel);

router
  .route('/hotels/:hotelId')
  .get(hotelController.getSingleHotel);

// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(reviewController.getAllReviews)
  .post(reviewController.addSingleReview);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(reviewController.getSingleReview);

module.exports = router;
