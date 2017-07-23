var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels.controllers.js');

router
  .route('/hotels')
  .get(hotelController.hotelsGetAll);

module.exports = router;
