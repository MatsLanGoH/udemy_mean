var mongoose = require('mongoose');

// Define review Schema
var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    review : {
        type : String,
        required : true
    },
    createdOn: {
        type : Date,
        default : Date.now
    }
});

// Define room schema
var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});

// Define hotel schema
var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true  // Validation
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    description : String,
    photos : [String],
    services : [String],
    currency : String,
    reviews : [reviewSchema],
    rooms : [roomSchema]
});

mongoose.model('Hotel', hotelSchema, 'hotels');
