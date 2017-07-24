var mongoose = require('mongoose');

// defina schema
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
    currency : String
});

mongoose.model('Hotel', hotelSchema, 'hotels');
