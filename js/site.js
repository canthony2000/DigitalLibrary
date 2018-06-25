var Library = function(){
  this._bookShelf = new Array();
};

Library.prototype.addBook = function (book) {};

Library.prototype.removeBookbyTttle = function (title) {};

document.addEventListener("DOMContentLoaded", function() {
  window.gLibrary = new Library();
  window.bookOne = new Book("IT","Stephan King", 800, new Date("12","24","1987"))
});
