//import dependencies
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes.js')
var express = require('express');
var path = require('path');
var cors = require('cors')
var app = express();

//enable CORS
app.use(cors());

//set app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set app to render static files
app.use(express.static(path.join(__dirname, 'client')));

//connect routes
routes(app, express);

//set port to whatever port heroku picks, default to 8080
port = process.env.PORT || 8080;

//create server and listen to port
var server = app.listen(port);
console.log('Listening on port ' + port);

//export app and server
module.exports = app;



