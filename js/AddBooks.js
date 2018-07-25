var AddBooksUI = function(container){
  Library.call(this);
  this._tempBookShelf = new Array();
  this.$container = container;
  this.Base64Result;
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
  this.$container.on("change", ':file', $.proxy(this._coverFileUpload, this));
  this.$container.on('hidden.bs.modal',$.proxy(this._resetForm,this))
  return true;
};

AddBooksUI.prototype._handleModalOpen = function () {
    this.$container.modal("show");
    this.Base64Result = "assets/defaultBook.jpg";
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
          $("#readyToAddBkCt").text(this._tempBookShelf.length + " Ready to add!\u00a0");
          this._resetForm("staying");
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
  //bookObj.bookCover = this.Base64Result;
  bookObj.bookCover = this.$container.find("#imgPreview").attr("src");
  var bookToAdd = new Book(bookObj);
  return bookToAdd;
};

AddBooksUI.prototype._coverFileUpload = function () {
  var preview = this.$container.find('#imgPreview');
  var file = document.querySelector('#fileUpload').files[0];
  var reader = new FileReader();
  var _self = this;
  reader.addEventListener("load", function () {
    _self.Base64Result = reader.result;
    preview.attr("src",_self.Base64Result);
  }, false);

  if (file) {reader.readAsDataURL(file);};
  return true;
};

AddBooksUI.prototype._resetForm = function (status) {
  $("#add-books-frm")[0].reset();
  $("#add-books-frm").find("#imgPreview").attr("src","assets/defaultBook.jpg");
  if (status != "staying"){
    this._tempBookShelf = [];
    this.$container.find("#readyToAddBkCt").text("0 Ready to Add!");
  }
  return false;
}

$(function() {
  window.gAddBooksUI = new AddBooksUI($("#addABook"))
  window.gAddBooksUI.init();
  return true;
});
