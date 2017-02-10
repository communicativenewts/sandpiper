//import mongoose
var mongoose = require('mongoose');

//connect to mLab database via heroku

// *** OLD DATABASE PATH
// mongoose.connect('mongodb://heroku_0tmvq5b9:qr6ah07s4molbdkkrdjllne027@ds139969.mlab.com:39969/heroku_0tmvq5b9');

// *** NEW CONNECTION: UNCOMMENT WHEN READY ***
mongoose.connect('mongodb://heroku_kwr4d7rz:vidm0hhrm3j3vhm8rpv2ulnlrs@ds149059.mlab.com:49059/heroku_kwr4d7rz');

//open a mongoose connection
var db = mongoose.connection;

//handle errors on connection
db.on('error', console.error.bind(console, 'connection error'));

//handle successful connection
db.once('open', function() {
  console.log('Successfuly connected to database')
});

//export database connection
module.exports = db;