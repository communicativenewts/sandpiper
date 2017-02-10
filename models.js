//import mongoose and database
var mongoose = require('mongoose');
var db = require('./database.js')

//create new users schema
var userSchema = mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  email: String,
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }]
});

var siteSchema = mongoose.Schema({
  _id: Number,
  _creator: { type: Number, ref: 'User' },
  url: String,
  title: String,
  clicks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'linkClickSchema' }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pageViewSchema' }]
});

//create new linkClick schema
var linkClickSchema = mongoose.Schema({
  _site: { type: Number, ref: 'Site' },
  url: String,
  count: Number,
  date: Array
});

//create new pageView schema
var pageViewSchema = mongoose.Schema({
  _site: { type: Number, ref: 'Site' },
  title: String,
  count: Number,
  date: Array
});

//create models for each schema
var User = mongoose.model('User', userSchema);
var Site = mongoose.model('Site', siteSchema);
var linkClickModel = mongoose.model('linkClickSchema', linkClickSchema);
var pageViewModel = mongoose.model('pageViewSchema', pageViewSchema);

//export models
module.exports = {
  User: User,
  Site: Site,
  linkClickModel: linkClickModel,
  pageViewModel: pageViewModel
};