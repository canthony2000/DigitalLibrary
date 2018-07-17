var AddBooksUI = function(container){
  Library.call(this);
  this._tempBookShelf = new Array();
  this.$container = container;
  return true;
};

AddBooksUI.prototype = Object.create(Library.prototype);

AddBooksUI.prototype.init =function () {
  this._bindEvents();
  return true;
};

AddBooksUI.prototype._bindEvents = function () {
  $("#add-books-btn").on("click", $.proxy(this._handleModalOpen, this));
  this.$container.find("#add-to-queue-btn").on("click", $.proxy(this._addBooksToQueue, this));
  this.$container.find("#add-to-lib-btn").on("click", $.proxy(this._addBooksToLibrary, this));
  return true;
};

AddBooksUI.prototype._handleModalOpen = function () {
    this.$container.modal("show");
    return true;
};

AddBooksUI.prototype._addBooksToQueue = function () {
  //make sure book is not in library before adding to queue.

  var bTitle = this.$container.find("#bookTitle");
  var bAuthor = this.$container.find("#bookAuthor");
  var bPages = this.$container.find("#bookPages");
  var bPubDate = this.$container.find("#bookPubDate");

  if(bTitle.val().length > 0 && !$.isNumeric(bTitle.val())){
    if(bAuthor.val().length > 0 && !$.isNumeric(bAuthor.val())){
      if($.isNumeric(bPages.val()) && !(bPages.val() % 1)){
        if($.isNumeric(Date.parse(bPubDate.val()))){
          this._tempBookShelf.push(this._collectBookInfo());
          $("#readyToAddBkCt").text(this._tempBookShelf.length + " Ready to add!");
          $("#add-books-frm")[0].reset();
        } else {
          alert("Please enter a date.")
          bPubDate.val("");
          bPubDate.focus();
        }
      } else {
        alert("Please enter the number of pages as a number.")
        bPages.val("");
        bPages.focus();
      }
    } else {
      alert("Please enter a book author.")
      bAuthor.val("");
      bAuthor.focus();
    }
  } else {
    alert("Please enter a book title.");
    bTitle.val("");
    bTitle.focus();
  }
  return true;
};

AddBooksUI.prototype._addBooksToLibrary = function () {
  if (this._tempBookShelf.length > 0){
   alert(this.addBooks(this._tempBookShelf) + " book(s) were added to the library.");
   $("#readyToAddBkCt").text("0 Ready to add!");
   this._tempBookShelf = [];
  } else { alert("You have not yet added books to the Queue.")}
  return true;
};

AddBooksUI.prototype._collectBookInfo = function () {
  var bookObj = new Object();
    var queueBook = this.$container.find("form").serializeArray();
    $.each(queueBook, function(i, objProp) {
      bookObj[objProp.name] = objProp.value;
    });
  var bookToAdd = new Book(bookObj);
  return bookToAdd;
}

$(function() {
  window.gAddBooksUI = new AddBooksUI($("#addABook"))
  window.gAddBooksUI.init();
  return true;
});
