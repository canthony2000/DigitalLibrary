var ShowBooksUI= function(container){
  Library.call(this);
  this.$container = container;
  this.gridRange = 0;
  this.gridContainer = this.$container.find(".container-fluid");
  bookCardHTML = this.$container.find(".col-lg-4")[0].innerHTML;
  return true;
};

ShowBooksUI.prototype = Object.create(Library.prototype);

ShowBooksUI.prototype.init = function () {
  this._bindEvents();
  return true;
};

ShowBooksUI.prototype._handleShowBooks = function () {
  var books = this.getTitles();
  if(books.length){
    this.$container.modal("show");
    this.gridContainer.html(this._createBooksGrid());
  } else {
    alert("Nothing in library!");
  }
  return false;
};

ShowBooksUI.prototype._bindEvents = function () {
  $("#show-books-btn").on("click", $.proxy(this._handleShowBooks, this));
  $("#show-all-prev-btn").on("click", $.proxy(this._getPrevSix, this));
  $("#show-all-next-btn").on("click", $.proxy(this._getNextSix, this));
  $("#show-all-close-btn").on("click", $.proxy(this._closeSuggestBook, this));
  return true;
};

ShowBooksUI.prototype._getNextSix = function () {
  if (this.gridRange +6 < window._bookShelf.length) {
  this.gridRange += 6;
  this.gridContainer.html(this._createBooksGrid());
  }
};

ShowBooksUI.prototype._getPrevSix = function () {
  if (this.gridRange > 5) {
    this.gridRange -= 6;
    this.gridContainer.html(this._createBooksGrid());
  }
};

ShowBooksUI.prototype._closeSuggestBook = function () {
  this.gridRange = 0;
  this.$container.modal("hide");
};

ShowBooksUI.prototype._createBooksGrid = function () {

  var $grid = document.createElement('div');
  var booksMade = 0;
  var rangeSize = _bookShelf.length - this.gridRange;

  for (var i = 0; i < 2; i++) {
    var rowDiv = document.createElement('div');
    rowDiv.setAttribute("class","row");
    $grid.append(rowDiv);

    for (var j = 0; j < 3; j++) {
      var div2 = document.createElement('div');
      div2.setAttribute("class","col-lg-4")
      div2.innerHTML = bookCardHTML;
      rowDiv.append(div2)
      booksMade++;

      var bkObj = _bookShelf[this.gridRange + booksMade - 1];
      d = new Date(bkObj.Publish_Date);
      var $targetField = $(div2).find('.card-body');
      $(div2).find(".card-img-top").attr("src",bkObj.bookCover);
      $targetField.find(".card-title").text(bkObj.Title);
      var elemHTML = "by " + bkObj.Author + "<br> Published in " + d.getFullYear() + "<br>" + bkObj.Number_Of_Pages + " Pages";
      $targetField.find("p").html(elemHTML);
      elemHTML = "assets/rate" + bkObj.Rating + ".svg";
      $targetField.find("img").attr("src",elemHTML);

      if (rangeSize < 6) {if (booksMade === rangeSize){i=2; j=3;}
      };
    };
  };

  $grid.append(rowDiv);
  return $grid.innerHTML;
 };

$(function(){
  window.gShowBooksUI = new ShowBooksUI($("#showAllBooks"));
  window.gShowBooksUI.init();
  return true;
});
