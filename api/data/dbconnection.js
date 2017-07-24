var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';  // local dev database

var _connection = null;

// Open database connection
var open = function() {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log("DB Connection failed", err);
            return;
        }
        _connection = db;
        console.log("DB connection open", db);
    });
};

var get = function() {
   return _connection;
}

module.exports = {
    open : open,
    get : get
};
