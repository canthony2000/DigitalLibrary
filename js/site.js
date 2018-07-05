//********************
//library
//Created by Corey Anthonhy
//20180703-0850
//Bootstrap-4.1.1

var Library;
(function() {
  var instance;
  Library = function() {
    if (instance) {
      return instance;
    }
    instance = this;
    this._bookShelf = new Array();
  }
})();

var Book = function(title,author,numberOfPages,publishDate){
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
}

Library.prototype._checkIfBookExists = function(title) {
  if (this._bookShelf.length != 0 && title) {
    for (var i = 0; i < this._bookShelf.length; i++) {
      if (this._bookShelf[i].title.toLowerCase() == title.toLowerCase()) {return i+1;}
    }
  }
  return false;
}

Library.prototype.addBook = function (book) {
  if (typeof book === "object" && !this._checkIfBookExists(book.title)) {
    this._bookShelf.push(book);
    this._setLibState(); //update local storage
    return true;
  }
  return false;
};

Library.prototype.addBooks = function (books) {
  if(books) {
    var bookCt = 0;
    for (var i = 0; i < books.length; i++) {
      if(this.addBook(books[i])) {bookCt++};
    }
    return bookCt;
  }
  return 0;
};

Library.prototype.removeBookbyTitle = function (title) {
  if(typeof(title) === "string"){
    var bkChk = this._checkIfBookExists(title);
    if(bkChk){
      this._bookShelf.splice(bkChk - 1,1);
      this._setLibState();
      return true;
    }
  }
  return false;
};

Library.prototype.removeBookbyAuthor = function (authorName) {
  var bookCt = 0;
  if (this._bookShelf.length != 0 && authorName) {
    for (var i = 0; i < this._bookShelf.length; i++) {
      if(this._bookShelf[i].author == authorName){
        this._bookShelf.splice(i,1);
        bookCt++;
        i--;
        this._setLibState();
      }
    }
    if (bookCt === 0){
      console.log("No book by " + authorName + " exists in the library.");
       return false;
     } else {
       console.log(bookCt + " books by " + authorName + " deleted.");
       return true;
     }
  }
  return false;
};

Library.prototype._genRandNo = function (rangeTop){
  return Math.floor(Math.random() * rangeTop + 1);
}

Library.prototype._ftrArray = function (arrayToFilter) {
  return arrayToFilter.filter(function (value, index, self) {
  return self.indexOf(value) === index;
  });
}

Library.prototype.getRandomBook = function () {
  if (this._bookShelf.length != 0){
    return this._bookShelf[this._genRandNo(this._bookShelf.length) -1];
  } else {
    return null;
  }
  return false;
};

Library.prototype.getBooksbyTitle = function (title) {
  var titleSearch = [];
  if(typeof(title) === "string"){
    var titleLower = title.toLowerCase();
    var tsIndex = 0;
    if (this._bookShelf.length != 0){
      for (var i = 0; i < this._bookShelf.length; i++) {
        if(this._bookShelf[i].title.toLowerCase().indexOf(titleLower) != -1){
          titleSearch[tsIndex] = this._bookShelf[i];
          tsIndex++;
        }
      }
    }
  }
  return titleSearch;
};

Library.prototype.getBooksbyAuthor = function (author) {
  var bookSearch = [];
  if(typeof(author) === "string"){
    var authorLower = author.toLowerCase();
    var bkIndex = 0;
    if (this._bookShelf.length != 0){
      for (var i = 0; i < this._bookShelf.length; i++) {
        if(this._bookShelf[i].author.toLowerCase().indexOf(authorLower) != -1){
          bookSearch[bkIndex] = this._bookShelf[i];
          bkIndex++;
        }
      }
    }
  }
  return bookSearch;
};

Library.prototype.getBooksbyYear = function (searchYear) {
  var booksByYear = [];
  if(searchYear){
    if (typeof(searchYear) === "number") {searchYear = searchYear.toString();}
    if (typeof(searchYear) === "string") {
      if (searchYear = searchYear.match(/\d{4}/g)) {
        var chkYear = parseInt(searchYear);
        for (var i = 0; i < this._bookShelf.length; i++) {
          var pubYear = this._bookShelf[i].publishDate.getFullYear();
          if (pubYear >= chkYear - 10 && pubYear <= chkYear +10) {
            booksByYear.push(this._bookShelf[i]);
          }
        }
      }
    }
  }
  return booksByYear ;
};

Library.prototype.getBooksbyPageCt = function (pageCt) {
  var booksInPageRange = [];
  if(pageCt){
    if (typeof(pageCt) === "number") {pageCt = pageCt.toString();}
    if (typeof(pageCt) === "string") {
      if (pageCt = pageCt.match(/\d+/)) { //use the first occurance of a number as basis for page range
         var chkPage = parseInt(pageCt);
         for (var i = 0; i < this._bookShelf.length; i++) {
           if (this._bookShelf[i].numberOfPages <= chkPage +75 && this._bookShelf[i].numberOfPages >= chkPage -75) {
             booksInPageRange.push(this._bookShelf[i]);
          }
        }
      }
    }
  }
  return booksInPageRange;
};

//purpose: bonus more robust search function
Library.prototype.getBookBySearchTerm = function(searchTerm){
  if (typeof(searchTerm) === "number") {searchTerm = searchTerm.toString();}
  if (typeof(searchTerm) === "string") {
    var searchResults = this.getBooksbyAuthor(searchTerm);
    searchResults = searchResults.concat(this.getBooksbyTitle(searchTerm),this.getBooksbyYear(searchTerm),this.getBooksbyPageCt(searchTerm));
    searchResults = this._ftrArray(searchResults);
    return searchResults;
  }
  return false;
}

Library.prototype.getAuthors = function () {
  var authorList = [];
    if (this._bookShelf.length != 0){
      for (var i = 0; i < this._bookShelf.length; i++) {
        authorList[i] = this._bookShelf[i].author;
      }
      authorList = this._ftrArray(authorList);
    }
  return authorList;
};

Library.prototype.getRandomAuthorName = function () {
  if (this._bookShelf.length != 0){
    var uniqueAuthors = this.getAuthors();
    return uniqueAuthors[this._genRandNo(uniqueAuthors.length) -1];
  } else {
    return null;
  }
  return false;
};


//******************
//Local Storage Methods

Library.prototype._setLibState = function () {
  if (typeof(Storage) !== "undefined" ? true : false){
    localStorage.setItem("libData", JSON.stringify(this._bookShelf));
    return true;
  }
  return false;
}

Library.prototype._getLibState = function () {
  if (localStorage.length){
    var bookShelfData = [];
    var libData = localStorage.getItem('libData');
    bookShelfData = ('bookshelfCopy: ', JSON.parse(libData));

    for (var i = 0; i < bookShelfData.length; i++) {
      var bookToInsert = new Book;
      bookToInsert.title = bookShelfData[i].title;
      bookToInsert.author= bookShelfData[i].author;
      bookToInsert.numberOfPages = bookShelfData[i].numberOfPages;
      bookToInsert.publishDate = new Date(bookShelfData[i].publishDate);
      this._bookShelf.push(bookToInsert);
      delete bookToInsert;
    }
    return true;
  }
  return false;
}

//******************
//Utility functions

Library.prototype.list = function () {
  for (var i = 0; i < this._bookShelf.length; i++) {
    console.log(this._bookShelf[i]);
    }
  return "-Complete book title listing-";
}

Library.prototype.init = function () {
  console.log(this.addBooks(bookList));
  console.log(this.list());
  return "Init script complete"
}

document.addEventListener("DOMContentLoaded", function() {
  window.gLibrary = new Library();
  window.gLibrary2 = new Library(); // for checking singleton instance functionality
  window.book01 = new Book("IT","Stephan King", 800, "12/24/1987");
  window.book02 = new Book("Moby Dick","Herman Melville", 754, "06/02/1851");
  window.book03 = new Book("Animal Farm","George Orwell", 322, "02/04/1945");
  window.book04 = new Book("To Kill a Mockingbird","Harper Lee", 512, "04/04/1965");
  window.book05 = new Book("1984","George Orwell", 432, "07/01/1950");
  window.book06 = new Book("The Road to Wigan Pier","George Orwell", 212, "03/23/1937");
  window.book07 = new Book("Go Set a Watchman","Harper Lee", 223, "01/13/2015");
  window.bookList = [book01,book02,book03,book04,book05,book06,book07]
  gLibrary._getLibState();

});


//************table check All

$('#chckHead').click(function () {
  if (this.checked == false) {
      $('.chcktbl:checked').attr('checked', false);
  } else {
      $('.chcktbl:not(:checked)').attr('checked', true);
  }
});
  $('#chckHead').click(function () {
});

//************File Upload

function bs_input_file() {
	$(".input-file").before(
		function() {
			if ( ! $(this).prev().hasClass('input-ghost') ) {
				var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
				element.attr("name",$(this).attr("name"));
				element.change(function(){
					element.next(element).find('input').val((element.val()).split('\\').pop());
				});
				$(this).find("button.btn-choose").click(function(){
					element.click();
				});
				$(this).find("button.btn-reset").click(function(){
					element.val(null);
					$(this).parents(".input-file").find('input').val('');
				});
				$(this).find('input').css("cursor","pointer");
				$(this).find('input').mousedown(function() {
					$(this).parents('.input-file').prev().click();
					return false;
				});
				return element;
			}
		}
	);
}
$(function() {
	bs_input_file();
});
