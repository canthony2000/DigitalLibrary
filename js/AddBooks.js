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
  $('#add-books-btn').on('click', $.proxy(this._handleModalOpen, this));
  $('#add-to-queue-btn').on('click', $.proxy(this._addBooksToQueue, this));
}

AddBooksUI.prototype._handleModalOpen = function () {
    this.$container.modal('show');
}

AddBooksUI.prototype._addBooksToQueue = function () {

  var bTitle = $('#bookTitle');
  var bAuthor = $('#bookAuthor');
  var bPages = $('#bookPages');
  var bPubDate = $('#bookPubDate');

  if(bTitle.val().length > 0 && !$.isNumeric(bTitle.val())){
    if(bAuthor.val().length > 0 && !$.isNumeric(bAuthor.val())){
      if($.isNumeric(bPages.val()) && !(bPages.val() % 1)){
        if($.isNumeric(Date.parse(bPubDate.val()))){
          var bookToQueue = new Book(bTitle.val(),bAuthor.val(),parseInt(bPages.val()),bPubDate.val());
          this._tempBookShelf.push(bookToQueue);
          $('#readyToAddBkCt').html(this._tempBookShelf.length + " Ready to add!");
          bTitle.val("");
          bAuthor.val("");
          bPages.val("");
          bPubDate.val("");
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




// find the add books Model
$(function() {
  window.gAddBooksUI = new AddBooksUI($('#addABook'))
  window.gAddBooksUI.init();
})

//remove the HTML attribute that fires the model on the button that opens the model
