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

  this.Base64Result = book[0].bookCover;
  $("#editbookTitle").val(book[0].Title);
  $("#editbookAuthor").val(book[0].Author);
  $("#editbookRating").val(book[0].Rating);
  $("#editbookPages").val(book[0].Number_Of_Pages);
  $("#editbookSynopsys").val(book[0].Synopsys);
  var d = new Date(book[0].Publish_Date);
  console.log(d);
  $("#editbookPubDate").val(d);
  var preview = $('#editimgPreview');
  preview.attr("src",this.Base64Result)

console.log(book);

  //this.$container.find("#editbookAuthor").text(arr.Author);

  // var suggestedAuthor = this.getRandomAuthorName();
  // if(suggestedAuthor.length){
  //   this.$container.modal("show");
  //   this.$container.find("li").html(suggestedAuthor);
  // } else {
  //   alert("Nothing in library!");
  // }
 return false;
};

EditBookAttribUI.prototype._bindEvents = function () {
  $("#main-books-listing").on("click", "#book-edit-btn", $.proxy(this._handleEditBook, this));
  this.$container.on("change", ':file', $.proxy(this._coverFileUpload, this));
  this.$container.on('hidden.bs.modal',$.proxy(this._resetForm,this))
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

EditBookAttribUI.prototype._resetForm = function () {
  $("#edit-books-frm")[0].reset();
  $("#edit-books-frm").find("#editimgPreview").attr("src","assets/defaultBook.jpg");
  return false;
}

$(function(){
  window.gEditBookAttribUI = new EditBookAttribUI($("#editBookAttrib"));
  window.gEditBookAttribUI.init();
  return true;
});
