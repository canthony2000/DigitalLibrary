var AddBooksUI = function(container){
  Library.call(this);
  this._tempBookShelf = new Array();
  this.$container = container;
}

AddBooksUI.prototype = Object.create(Library.prototype);

AddBooksUI.prototype.init =function () {
  this._bindEvents();
}

AddBooksUI.prototype._bindEvents = function () {
  $("#add-books-btn").on("click", $.proxy(this._handleModalOpen, this));
  this.$container.find("#add-to-queue-btn").on("click", $.proxy(this._addBooksToQueue, this));
  this.$container.find("#add-to-lib-btn").on("click", $.proxy(this._addBooksToLibrary, this));
}

AddBooksUI.prototype._handleModalOpen = function () {
    this.$container.modal("show");
}

AddBooksUI.prototype._addBooksToQueue = function () {
  //could use .serializeArray to get the form fields without hardcoding it.
  //need name="title (or whatever)" attribute on each field which becomes the key
  //make sure book is not in library before adding to queue.
  //use .find to get the node from the container and not from the whole dom
  var bTitle = $("#bookTitle");
  var bAuthor = $("#bookAuthor");
  var bPages = $("#bookPages");
  var bPubDate = $("#bookPubDate");
  var bRating = $("#bookRating");
  var bSynopsys = $("#bookSynopsys");
  var bCover = $("#bookImage");

  if(bTitle.val().length > 0 && !$.isNumeric(bTitle.val())){
    if(bAuthor.val().length > 0 && !$.isNumeric(bAuthor.val())){
      if($.isNumeric(bPages.val()) && !(bPages.val() % 1)){
        if($.isNumeric(Date.parse(bPubDate.val()))){
          var bookToQueue = new Book(bTitle.val(),bAuthor.val(),parseInt(bPages.val()),bPubDate.val(),bRating.val(),bSynopsys.val(),bCover.val());
          this._tempBookShelf.push(bookToQueue);
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
}

AddBooksUI.prototype._addBooksToLibrary = function () {
  if (this._tempBookShelf.length > 0){
   alert(this.addBooks(this._tempBookShelf) + " book(s) were added to the library.");
   //this._updateMainBookListing();
   $("#readyToAddBkCt").text("0 Ready to add!");
  } else { alert("You have not yet added books to the Queue.")}
}

// find the add books Model
$(function() {
  window.gAddBooksUI = new AddBooksUI($("#addABook"))
  window.gAddBooksUI.init();
})
