var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels.controllers.js');

router
  .route('/hotels')
  .get(hotelController.getAllHotels);

router
  .route('/hotels/:hotelId')
  .get(hotelController.getSingleHotel);

router
  .route('/hotels/new')
  .post(hotelController.addSingleHotel);

module.exports = router;
