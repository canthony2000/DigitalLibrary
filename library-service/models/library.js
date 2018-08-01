// Library.js
var mongoose = require('mongoose');
var LibrarySchema = new mongoose.Schema({
  //bookCover: String, //Base64 Encoded
  bookCover: String, //Base64 Encoded
  Title: String,
  Author: String,
  Number_Of_Pages: Number,
  Publish_Date: String,
  Rating: Number,
  Synopsys: String,
});
mongoose.model('Library', LibrarySchema);

module.exports = mongoose.model('Library');

console.log("library");
