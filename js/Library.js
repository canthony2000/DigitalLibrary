//********************
//library
//Created by Corey Anthonhy
//Bootstrap-4.1.1

var Library;
(function() {
  var instance;
  Library = function() {
    if (instance) {
      return instance;
    }
    instance = this;
  }
})();

Library.prototype._handleEventTrigger = function(sEvent, oData) {
  var oData = oData || {}; //sets oData to an empty object if it does not have data
  if (sEvent) {
    var event = new CustomEvent(sEvent, oData);
    document.dispatchEvent(event);
  }
}

//custom dispatch if data changes.  This decouples AddBooksUI from DataTable.
Library.prototype._checkIfBookExists = function(Title) {
  if (window._bookShelf.length != 0 && Title) {
    for (var i = 0; i < window._bookShelf.length; i++) {
      if (window._bookShelf[i].Title.toLowerCase() == Title.toLowerCase()) {return i+1;}
    }
  }
  return false;
}

Library.prototype.addBook = function (book) {
  if (typeof book === "object" && !this._checkIfBookExists(book.Title)) {
    window._bookShelf.push(book);
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
    this._handleEventTrigger("objUpdate2", {
      detail: {data: "bookCt"}
    });
    return bookCt;
  }
  return 0;
};

Library.prototype.removeBookbyTitle = function (Title) {
  if(typeof(Title) === "string"){
    var bkChk = this._checkIfBookExists(Title);
    if(bkChk){
      window._bookShelf.splice(bkChk - 1,1);
      this._setLibState();
      this._handleEventTrigger("objUpdate2", {
        detail: {data: "bookCt"}
      });
      return true;
    }
  }
  return false;
};

Library.prototype.removeBookbyAuthor = function (authorName) {
  var bookCt = 0;
  if (window._bookShelf.length != 0 && authorName) {
    for (var i = 0; i < window._bookShelf.length; i++) {
      if(window._bookShelf[i].Author == authorName){
        window._bookShelf.splice(i,1);
          console.log(window._bookShelf);
        bookCt++;
        i--;
        this._setLibState();
        this._handleEventTrigger("objUpdate2", {
          detail: {data: "bookCt"}
        });
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
  if (window._bookShelf.length != 0){
    return window._bookShelf[this._genRandNo(window._bookShelf.length) -1];
  } else {
    return null;
  }
  return false;
};

Library.prototype.getBooksbyTitle = function (Title) {
  var TitleSearch = [];
  if(typeof(Title) === "string"){
    var TitleLower = Title.toLowerCase();
    var tsIndex = 0;
    if (window._bookShelf.length != 0){
      for (var i = 0; i < window._bookShelf.length; i++) {
        if(window._bookShelf[i].Title.toLowerCase().indexOf(TitleLower) != -1){
          TitleSearch[tsIndex] = window._bookShelf[i];
          tsIndex++;
        }
      }
    }
  }
  return TitleSearch;
};

Library.prototype.getBooksbyAuthor = function (author) {
  var bookSearch = [];
  if(typeof(author) === "string"){
    var authorLower = Author.toLowerCase();
    var bkIndex = 0;
    if (window._bookShelf.length != 0){
      for (var i = 0; i < window._bookShelf.length; i++) {
        if(window._bookShelf[i].Author.toLowerCase().indexOf(authorLower) != -1){
          bookSearch[bkIndex] = window._bookShelf[i];
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
        for (var i = 0; i < window._bookShelf.length; i++) {
          var pubYear = window._bookShelf[i].Publish_Date.getFullYear();
          if (pubYear >= chkYear - 10 && pubYear <= chkYear +10) {
            booksByYear.push(window._bookShelf[i]);
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
         for (var i = 0; i < window._bookShelf.length; i++) {
           if (window._bookShelf[i].Number_Of_Pages <= chkPage +75 && window._bookShelf[i].Number_Of_Pages >= chkPage -75) {
             booksInPageRange.push(window._bookShelf[i]);
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
    if (window._bookShelf.length != 0){
      for (var i = 0; i < window._bookShelf.length; i++) {
        authorList[i] = window._bookShelf[i].Author;
      }
      authorList = this._ftrArray(authorList);
    }
  return authorList;
};

Library.prototype.getTitles = function () {
  var TitleList = [];
    if (window._bookShelf.length != 0){
      for (var i = 0; i < window._bookShelf.length; i++) {
        TitleList[i] = window._bookShelf[i].Title;
      }
      TitleList = this._ftrArray(TitleList);
    }
  return TitleList;
};

Library.prototype.getRandomAuthorName = function () {
  if (window._bookShelf.length != 0){
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
    localStorage.setItem("libData", JSON.stringify(window._bookShelf));
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
      // var bookToInsert = new Book

      var bookToInsert = new Book({
        bookCover : bookShelfData[i].bookCover,
        Title : bookShelfData[i].Title,
        Author : bookShelfData[i].Author,
        Number_Of_Pages : bookShelfData[i].Number_Of_Pages,
        Publish_Date : new Date(bookShelfData[i].Publish_Date),
        Rating : bookShelfData[i].Rating,
        Synopsys : bookShelfData[i].Synopsys,
      });

      // bookToInsert.Title = bookShelfData[i].Title;
      // bookToInsert.Author= bookShelfData[i].Author;
      // bookToInsert.Number_Of_Pages = bookShelfData[i].Number_Of_Pages;
      // bookToInsert.Publish_Date = new Date(bookShelfData[i].Publish_Date);
      // bookToInsert.Rating = bookShelfData[i].Rating;
      // bookToInsert.Synopsys = bookShelfData[i].Synopsys;
      // bookToInsert.bookCover = bookShelfData[i].bookCover;


      window._bookShelf.push(bookToInsert);
      delete bookToInsert;
    }
    return true;
  }
  return false;
}

//******************
//Utility functions

// Library.prototype._updateMainBookListing = function () {
//   var myTable = document.createElement("table");
//   myTable.innerHTML = $("#main-books-listing").html();
//   $(myTable.getElementsByTagName('tbody')).remove();
//   var newTBody = document.createElement("tbody");
//
//   for (var i = 0; i < window._bookShelf.length; i++) {
//     var tr = document.createElement("tr");
//     newTBody.append(tr);
//   }
//   myTable.append(newTBody);
//   console.log(newTBody.innerHTML);
//   console.log(myTable);
// }


// document.addEventListener("DOMContentLoaded", function() {
// });
