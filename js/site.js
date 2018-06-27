var Library = function(){
  this._bookShelf = new Array();
};

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
  if (book && !this.checkIfBookExists(book.title)) {
    this._bookShelf.push(book);
    return true;
    } else {
    return false;
  }
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
  var bkChk = this.checkIfBookExists(title);
  if(!bkChk){
    return false;
  } else {
    this._bookShelf.splice(bkChk - 1,1);
    return true;
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

Library.prototype.genRandNo = function (rangeTop){
  return Math.floor(Math.random() * rangeTop + 1);
}

Library.prototype.ftrArray = function (arrayToFilter) {
  return arrayToFilter.filter(function (value, index, self) {
  return self.indexOf(value) === index;
  });
}

Library.prototype.getRandomBook = function () {
  if (this._bookShelf.length != 0){
    return this._bookShelf[this.genRandNo(this._bookShelf.length) -1];
  } else {
    return null;
  }
  return false;
};

Library.prototype.getBooksbyTitle = function (title) {
  var titleSearch = [];
  if(title){
    var titleLower = title.toLowerCase();
    var tsIndex = 0;
    if (this._bookShelf.length != 0){
      for (var i = 0; i < this._bookShelf.length; i++) {
        if(this._bookShelf[i].title.toLowerCase().indexOf(titleLower) != -1){
          titleSearch[tsIndex] = this._bookShelf[i].title;
          tsIndex++;
        }
      }
    }
  }
  return titleSearch;
};

Library.prototype.getBooksbyAuthor = function (author) {
  var bookSearch = [];
  if(author){
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

Library.prototype.getAuthors = function () {
  var authorList = [];
    if (this._bookShelf.length != 0){
      for (var i = 0; i < this._bookShelf.length; i++) {
        authorList[i] = this._bookShelf[i].author;
      }
      authorList = this.ftrArray(authorList);
    }
  return authorList;
};

Library.prototype.getRandomAuthorName = function () {
  if (this._bookShelf.length != 0){
    var uniqueAuthors = this.getAuthors();
    return uniqueAuthors[this.genRandNo(uniqueAuthors.length) -1];
  } else {
    return null;
  }
  return false;
};


//******************
//Local Storage Methods

Library.prototype._setLibState = function () {
  if (typeof(Storage) !== "undefined" ? true : false){
    var libDataLS = this._bookShelf;
    localStorage.setItem('libData', JSON.stringify(libDataLS));
    return true;
  }
  return false;
}

Library.prototype._getLibState= function () {
  if (localStorage.length){
    var bookShelfData = [];
    var bookShelfObj = [];
    var libData = localStorage.getItem('libData');
    bookShelfData = ('bookshelfCopy: ', JSON.parse(libData));

    for (var i = 0; i < bookShelfData.length; i++) {
      var bookToInsert = new Book;
      bookToInsert.title = bookShelfData[i].title;
      bookToInsert.author= bookShelfData[i].author;
      bookToInsert.numberOfPages = bookShelfData[i].numberOfPages;
      bookToInsert.publishDate = bookShelfData[i].publishDate;
      bookShelfObj.push(bookToInsert);
      delete bookToInsert;
    }

    this._bookShelf = bookShelfObj;
    return true;
  }
  return false;
}


//******************
//Utility functions

Library.prototype.list = function () {
  for (var i = 0; i < this._bookShelf.length; i++) {
      console.log(this._bookShelf[i].title + " - " + this._bookShelf[i].author);
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
  window.book01 = new Book("IT","Stephan King", 800, "12/24/1987");
  window.book02 = new Book("Moby Dick","Herman Melville", 754, "06/02/1851");
  window.book03 = new Book("Animal Farm","George Orwell", 322, "02/04/1945");
  window.book04 = new Book("To Kill a Mockingbird","Harper Lee", 512, "04/04/1965");
  window.book05 = new Book("1984","George Orwell", 432, "07/01/1950");
  window.book06 = new Book("The Road to Wigan Pier","George Orwell", 212, "03/23/1937");
  window.book07 = new Book("Go Set a Watchman","Harper Lee", 223, "01/13/2015");
  window.bookList = [book01,book02,book03,book04,book05,book06,book07]

});
