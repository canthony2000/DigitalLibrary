var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors');
var LibraryController = require('./controllers/librarycontroller');

app.use(cors());

//set up a route
app.use('/Library', LibraryController);
module.exports = app;

console.log("app.js");
