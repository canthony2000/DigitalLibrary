var Library = function(){
  this._bookShelf = new Array();
};

//var Book = function(){
var Book = function(title,author,numberOfPages,publishDate){
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
}

Library.prototype.checkIfBookExists = function(title) {
  if (this._bookShelf.length != 0 && title) {
    for (var i = 0; i < this._bookShelf.length; i++) {
      if (this._bookShelf[i].title.toLowerCase() == title.toLowerCase()) {return i+1;}
    }
  }
  return false;
}

Library.prototype.addBook = function (book) {
  if (!this.checkIfBookExists(book.title)) {
    this._bookShelf.push(book);
    return true;
    } else {
    console.log("Error :: Need to pass a Book object or book(s) already added.");
    return false;
  }
};

Library.prototype.addBooks = function (books) {
  var bookCt = 0;
  for (var i = 0; i < books.length; i++) {
    if(this.addBook(books[i])) {bookCt++};
  }
  return bookCt + " books successfully added.";
};

Library.prototype.removeBookbyTitle = function (title) {
  var bkChk = this.checkIfBookExists(title);
  if(!bkChk){
    return "Book title does not exist";
  } else {
    this._bookShelf.splice(bkChk - 1,1);
  }
};

Library.prototype.removeBookbyAuthor = function (authorName) {
  var bookCt = 0;
  if (this._bookShelf.length != 0 && authorName) {
    for (var i = 0; i < this._bookShelf.length; i++) {
      if(this._bookShelf[i].author == authorName){
        bookCt++;
        console.log(i); //delete these
      }
    }
    if (bookCt === 0){
       return "No book by this author exists in the library.";
     } else {
       return bookCt + " books by that author deleted."
     }
  }
  return false;
};

Library.prototype.getRandomBook = function () {

  return false;
};

Library.prototype.getRandomAuthorName = function () {

  return false;
};

Library.prototype.getBooksbyTitle = function (title) {

};

Library.prototype.getBooksbyAuthor = function (authorName) {

  return false;
};

Library.prototype.getAuthors = function () {

  return false;
};

//******************
//Utility functions

Library.prototype.getListOfTitles = function () {
  for (var i = 0; i < this._bookShelf.length; i++) {
      console.log(this._bookShelf[i].title);
    }
  return "-Complete book title listing-";
}

Library.prototype.init = function () {
  console.log(this.addBooks(bookList));
  console.log(this.getListOfTitles());
  return "Init script complete"
}


document.addEventListener("DOMContentLoaded", function() {
  window.gLibrary = new Library();
  window.book01 = new Book("IT","Stephan King", 800, "12/24/1987");
  window.book02 = new Book("Moby Dick","Herman Melville", 754, "06/02/1851");
  window.book03 = new Book("Animal Farm","George Orwell", 322, "02/04/1945");
  window.book04 = new Book("To Kill a Mockingbird","Harper Lee", 512, "04/04/1965");
  window.book05 = new Book("1984","George Orwell", 432, "07/01/1950");
  window.book06 = new Book("The Road to Wigan Pier","George Orwell", 212, "03/23/1937");
  window.book07 = new Book("Go Set a Watchman","Harper Lee", 223, "01/13/2015");
  window.bookList = [book01,book02,book03,book04,book05,book06,book07]
});
