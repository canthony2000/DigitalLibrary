var EditBookAttribUI = function(container){
  Library.call(this);
  this.$container = container;
  this.Base64Result;
  return true;
};

EditBookAttribUI.prototype = Object.create(Library.prototype);

EditBookAttribUI.prototype.init = function () {
  this._bindEvents();
  return true;
};

EditBookAttribUI.prototype._handleEditBook = function (e) {

  this.$container.modal("show");
  $tr = $(e.target).closest("tr");
  var key = $tr.find(".lib_Title_key").text();
  var book = this.getBooksbyTitle(key);

  this.$container.find("p").text(key);

  this.Base64Result = book[0].bookCover;
  this.$container.find("#editbookTitle").val(book[0].Title);
  this.$container.find("#editbookAuthor").val(book[0].Author);
  this.$container.find("#editbookRating").val(book[0].Rating);
  this.$container.find("#editbookPages").val(book[0].Number_Of_Pages);
  var d = new Date(book[0].Publish_Date);
  var dateStr = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +  ("0" + d.getDate()).slice(-2);
  this.$container.find("#editbookPubDate").val(dateStr);
  this.$container.find("#editbookSynopsys").val(book[0].Synopsys);

  var preview = this.$container.find('#editimgPreview');
  preview.attr("src",this.Base64Result)

  return false;
};

EditBookAttribUI.prototype._bindEvents = function () {
  $("#main-books-listing").on("click", "#book-edit-btn", $.proxy(this._handleEditBook, this));
  this.$container.on("change", ':file', $.proxy(this._coverFileUpload, this));
  this.$container.on('hidden.bs.modal', $.proxy(this._resetForm,this))
  this.$container.on('click', "#update-book-btn", $.proxy(this._updateBook,this))


  return true;
};

EditBookAttribUI.prototype._coverFileUpload = function () {
  var preview = this.$container.find('#editimgPreview');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  var _self = this;

  reader.addEventListener("load", function () {
    _self.Base64Result = reader.result;
    preview.attr("src",_self.Base64Result);
  }, false);

  if (file) {reader.readAsDataURL(file);};
  return true;
};

EditBookAttribUI.prototype._updateBook = function () {

  var bTitle = this.$container.find("#editbookTitle");
  var bAuthor = this.$container.find("#editbookAuthor");
  var bPages = this.$container.find("#editbookPages");
  var bPubDate = this.$container.find("#editbookPubDate");

  if(bTitle.val().length > 0){
    if(bAuthor.val().length > 0 && !$.isNumeric(bAuthor.val())){
      if($.isNumeric(bPages.val()) && !(bPages.val() % 1)){
        if($.isNumeric(Date.parse(bPubDate.val()))){
          var originalTitle = this.$container.find("p").text();

          var orgBkIndex;
          for (var i = 0; i < window._bookShelf.length; i++) {
            if (originalTitle === window._bookShelf[i].Title){
              orgBkIndex = i;
              i = window._bookShelf.length;
            }
          }

          //check if new title exists, skipping index of the original book
          var newTitle = this.$container.find("#editbookTitle").val();
          if(this._checkChangedTitleExist(newTitle,orgBkIndex)){
            alert("The new book title matches another existing title.  Please enter a new title.")
            bTitle.focus();
            return false;
          } else {
            window._bookShelf[orgBkIndex] = this._collectBookInfo();
            this._handleEventTrigger("objUpdate2", {detail: {data: "bookCt"}});
            this._setLibState();
            this.$container.find("p").text(newTitle);
            alert("Book information updated.")
          }
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

return false;
};

EditBookAttribUI.prototype._checkChangedTitleExist = function (bkTitle, indexToSkip) {
  for (var i = 0; i < window._bookShelf.length; i++) {
    if (i != indexToSkip) {
      if (window._bookShelf[i].Title.toLowerCase() === bkTitle.toLowerCase()) {
        return true;
      }
    }
  }
  return false;
};

EditBookAttribUI.prototype._collectBookInfo = function () {
  var bookObj = new Object();
  var queueBook = this.$container.find("form").serializeArray();
  $.each(queueBook, function(i, objProp) {
    bookObj[objProp.name] = objProp.value;
  });
  bookObj.bookCover = this.Base64Result;
  var bookToAdd = new Book(bookObj);
  return bookToAdd;
};

EditBookAttribUI.prototype._resetForm = function () {
  $("#edit-books-frm")[0].reset();
  $("#edit-books-frm").find("#editimgPreview").attr("src","assets/defaultBook.jpg");
  return false;
};

$(function(){
  window.gEditBookAttribUI = new EditBookAttribUI($("#editBookAttrib"));
  window.gEditBookAttribUI.init();
  return true;
});
