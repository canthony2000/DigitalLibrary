//********************
//library
//Created by Corey Anthonhy
//Bootstrap-4.1.1

const Library = function(){};

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

Library.prototype.addBooks = function (books) {
  //need to put back validation preventing duplicate books from being added
  //Try using index with no duplicates in mongodb
  var _self = this;
  return $.ajax({
    url: window.libraryURL,
    dataType:'json',
    method:'POST',
    data: { books: JSON.stringify(books) },
    success: function(data){
      window._bookShelf = window._bookShelf.concat(window.bookify(data.ops));
      _self._handleEventTrigger("booksAddOrDel", {detail: {data: "addBooks"}});
    }
  });
};

Library.prototype.removeBookbyTitle = function (Title) {
  var _self = this;
  if(typeof(Title) === "string"){
    var bkChk = this._checkIfBookExists(Title);
    if(bkChk){
      async function delBookdb(state){
        state._handleDeleteBookDb(window._bookShelf[bkChk - 1]._id);
      }
      delBookdb(_self);
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
  var _self = this;
  var bookCt = 0;
  if (window._bookShelf.length != 0 && authorName) {
    for (var i = 0; i < window._bookShelf.length; i++) {
      if(window._bookShelf[i].Author == authorName){
        async function delBookdb(state){
          await state._handleDeleteBookDb(window._bookShelf[i]._id);
        }
        delBookdb(_self);
        window._bookShelf.splice(i,1);
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
    var authorLower = author.toLowerCase();
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
//CRUD Routes

Library.prototype._handleGetBookCountDb = function (){
  return $.ajax({
    url: window.libraryURL + "/count",
    method:'GET',
    success: count => {
      return count
    }
  })
};

Library.prototype._handleGetBooksDb = function (start = 0, dbDocsTotal = 0){ //numResults 0 = end of data set (req.body.limit).

  $.ajax({
    url:`${window.libraryURL}/pages/${start}/${window._booksPerPage}`,
    dataType:'json',
    method: 'GET',
    success: data => {
      window._bookShelf = [];
      for (var i = 0; i < data.length; i++) {
        var bookToInsert = new Book({
          _id : data[i]._id,
          bookCover : data[i].bookCover,
          Title : data[i].Title,
          Author : data[i].Author,
          Number_Of_Pages : data[i].Number_Of_Pages,
          Publish_Date : new Date(data[i].Publish_Date),
          Rating : data[i].Rating,
          Synopsys : data[i].Synopsys,
        });
        window._bookShelf.push(bookToInsert);
        delete bookToInsert;
      }
      this._handleEventTrigger("objUpdate2", {detail: {data: "_handleGetBooksDb"}});
    }
  })

//)
  return false;
};

Library.prototype._handleDeleteBookDb = function (bookId){
  //let _self = this;
  $.ajax({
    url: window.libraryURL + "/" + bookId,
    dataType:'text',
    method:'DELETE',
    data: bookId,
    success: data => {
      console.log("Deleted book id " + bookId);
      this._handleEventTrigger("booksAddOrDel", {detail: {data: "handleDeleteBookDb"}});
    }
  })
};

Library.prototype._handleUpdateBookDb = function (bookId, bookParems){
  $.ajax({
    url: window.libraryURL + "/" + bookId,
    dataType:'text',
    method:'PUT',
    data: bookParems,
    success: data => {
      console.log("Updated book id " + bookId);
    }
  })
};

Library.prototype._handleGetSingleBookDb = function (bookId){
  $.ajax({
    url: window.libraryURL + "/" + bookId,
    dataType:'text',
    method:'GET',
    data: bookId,
    success: data => {
      $("#mongoDbResponse").text(data);
    }
  })
};

//******************
//Local Storage Methods

Library.prototype._setLibState = function () {
  if (typeof(Storage) !== "undefined" ? true : false){
    localStorage.setItem("libData", JSON.stringify(window._bookShelf));
    return true;
  }
  return false;
};

Library.prototype._getLibState = function () {
  if (localStorage.length){
    var bookShelfData = [];
    var libData = localStorage.getItem('libData');
    bookShelfData = ('bookshelfCopy: ', JSON.parse(libData));

    for (var i = 0; i < bookShelfData.length; i++) {
      var bookToInsert = new Book({
        bookCover : bookShelfData[i].bookCover,
        Title : bookShelfData[i].Title,
        Author : bookShelfData[i].Author,
        Number_Of_Pages : bookShelfData[i].Number_Of_Pages,
        Publish_Date : new Date(bookShelfData[i].Publish_Date),
        Rating : bookShelfData[i].Rating,
        Synopsys : bookShelfData[i].Synopsys,
      });
      window._bookShelf.push(bookToInsert);
      delete bookToInsert;
    }
    return true;
  }
  return false;
};
