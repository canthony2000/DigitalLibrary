var express = require('express');
var bodyParser = require('body-parser');
var Library = require('../models/library');

var router = express.Router();
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true,limit: '2tb' }));

// CREATES A NEW BOOK IN LIBRARY
router.post('/', function (req, res) {
  Library.create({
      bookCover: req.body.bookCover,
      Title: req.body.Title,
      Author: req.body.Author,
      Number_Of_Pages: req.body.Number_Of_Pages,
      Publish_Date: new Date(req.body.Publish_Date),
      Rating: req.body.Rating,
      Synopsys: req.body.Synopsys,
    },
    function (err, book) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(book);
    });
});

// RETURNS ALL BOOKS IN THE DATABASE
router.get('/', function (req, res) {
 Library.find({}, function (err, books) {
     if (err) return res.status(500).send('There was a problem finding books in library.');
     res.status(200).send(books);
 });
});

//DELETES A COMMENT FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Library.findByIdAndRemove(req.params.id, function (err, book) {
        if (err) return res.status(500).send("There was a problem deleting the book.");
        res.status(200).send("Book "+ book.title+" was deleted.");
    });
});

module.exports = router;
