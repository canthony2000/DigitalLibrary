var express = require('express');
var bodyParser = require('body-parser');
var Library = require('../models/library');

var router = express.Router();
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true,limit: '2tb' }));

// CREATES A NEW BOOK IN THE DATABASE (POST)
router.post('/', function (req, res) {
  Library.collection.insert(
    JSON.parse(req.body.books),
    function (err, book) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(book);
    });
});

//RETURNS ALL BOOKS IN THE DATABASE (GET)
router.get('/', function (req, res) {
 Library.find({}, function (err, books) {
     if (err) return res.status(500).send('There was a problem finding books in library.');
     res.status(200).send(books);
 });
});

//PAGINATION SET
router.get('/pages/:start/:numResults', function (req, res) {
  let pstart = parseInt(req.params.start);
  let pNumResults = parseInt(req.params.numResults);
  if (pNumResults === 0){pNumResults = req.body.limit};

  Library.find({})
  .lean()
  .skip(pstart)
  .limit(pNumResults)
  .sort([['Title', 1]])
  .exec(function (err, books)
  {
    if (err) return res.status(500).send('There was a problem finding books in library.');
    res.status(200).send(books);
  });
});

//GETS DOCUMENT COUNT (book count)
router.get('/count', function (req, res) {
  Library.estimatedDocumentCount(function(err, count){
    if (err) return res.status(500).send('There was a problem getting the book count.');
    res.status(200).send(count.toString());
  });
});

//GETS A SINGLE BOOK FROM THE DATABASE (GET:ID)
router.get('/:id', function (req, res) {
  Library.findById(req.params.id, function (err, book) {
    if (err) return res.status(500).send("There was a problem getting the book.");
    res.status(200).send(book);
  });
});

//DELETES A BOOK FROM THE DATABASE (DELETE:ID)
router.delete('/:id', function (req, res) {
    Library.findByIdAndRemove(req.params.id, function (err, book) {
        if (err) return res.status(500).send("There was a problem deleting the book.");
        res.status(200).send("Book "+ book.title+" was deleted.");
    });
});

//UPDATES A BOOK IN THE DATABASE (PUT:ID)
router.put('/:id', function (req, res) {
    Library.findByIdAndUpdate(req.params.id, req.body, {new:true}, function (err, book) {
        if (err) return res.status(500).send("There was a problem updating the book.");
        res.status(200).send("Book "+ book.title+" was updated.");
    });
});

module.exports = router;
