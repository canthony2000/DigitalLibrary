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

Library.prototype.addBook = function (book) {
  if (book) {
    this._bookShelf.push(book);
    return true;
    } else {
    console.log("Error :: Need to pass a Book object.");
  }
  return false;
};

Library.prototype.addBooks = function (books) {
  for (var i = 0; i < books.length; i++) {
    console.log(books[i]);
    this.addBook(books[i]);
  }
  return false;
};

Library.prototype.removeBookbyTitle = function (title) {

  return false;
};

Library.prototype.removeBookbyAuthor = function (authorName) {

  return false;
};

Library.prototype.getRandomBook = function () {

  return false;
};

Library.prototype.getRandomAuthorName = function () {

  return false;
};

Library.prototype.getBooksbyTitle = function (title) {

  return false;
};

Library.prototype.getBooksbyAuthor = function (authorName) {

  return false;
};

Library.prototype.getAuthors = function () {

  return false;
};


document.addEventListener("DOMContentLoaded", function() {
  window.gLibrary = new Library();
  window.book01 = new Book("IT","Stephan King", 800, "12/24/1987");
  window.book02 = new Book("Moby Dick","Herman Melville", 754, "06/02/1851");
  window.book03 = new Book("To Kill a Mockingbird","Harper Lee", 512, "04/04/1965");
  window.book04 = new Book("1984","George Orwell", 4321, "07/01/1950");
  window.bookList = [book01,book02,book03,book04]
});
