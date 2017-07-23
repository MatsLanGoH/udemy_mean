var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');

app.set('port', 3000);

// Middleware
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Route static content
app.use(express.static(path.join(__dirname, 'public')));


// Use routes
app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});

