var DeleteBooksUI = function(container){
  Library.call(this);
  this.$container = container;
};

DeleteBooksUI.prototype = Object.create(Library.prototype);

DeleteBooksUI.prototype.init = function () {
  this._bindEvents();
  return true;
};

DeleteBooksUI.prototype._bindEvents = function () {
  $("#del-book-btn").on("click", $.proxy(this._handleDeleteBooks, this));
  this.$container.find("#deletebookTitle").on("change", $.proxy(this._toggleTitleAuthor, this, status=1));
  this.$container.find("#deletebookAuthor").on("change", $.proxy(this._toggleTitleAuthor, this, status=0));
  this.$container.find("#del-selected-books-btn").on("click", $.proxy(this._deleteSelectedBooks, this));
  return true;
};

DeleteBooksUI.prototype._handleDeleteBooks = function () {
  this.$container.modal("show");
  this.$container.find("#deletebookTitle").html(this._populateDelTitles());
  this.$container.find("#deletebookAuthor").html(this._populateDelAuthors());
  return true;
};

DeleteBooksUI.prototype._populateDelTitles = function () {
  var titles = this.getTitles();
  var select = document.createElement("select");
  select.innerHTML = "<option selected value = '0'>Choose...</option>";
  for (var i = 0; i < titles.length; i++) {
    var option = document.createElement("option");
    option.value = titles[i];
    option.innerHTML = titles[i];
    select.append(option);
  }
  return $(select).html();
};

DeleteBooksUI.prototype._populateDelAuthors = function () {
  var titles = this.getAuthors();
  var select = document.createElement("select");
  select.innerHTML = "<option selected value = '0'>Choose...</option>";
  for (var i = 0; i < titles.length; i++) {
    var option = document.createElement("option");
    $(option).text(titles[i]);
    select.append(option);
  }
  return $(select).html();
};

DeleteBooksUI.prototype._toggleTitleAuthor = function (status) {
  if(status === 1){
    $('#deletebookAuthor').prop('selectedIndex',0);
  } else{
    $('#deletebookTitle').prop('selectedIndex',0);
  }
  return true;
};

DeleteBooksUI.prototype._deleteSelectedBooks = function (status) {
  var domNode = $('#deletebookTitle');
  if (domNode.val() != "0") {
    if (confirm("Are you sure that you want to delete the book " + domNode.val() + "?")){
      this.removeBookbyTitle(domNode.val());
      this.$container.find("#delete-books-frm")[0].reset();
      this.$container.find("#deletebookTitle").html(this._populateDelTitles());
      this.$container.find("#deletebookAuthor").html(this._populateDelAuthors());
    }
  } else if((domNode = $('#deletebookAuthor')).val() != "0") {
    if (confirm("Are you sure that you want to delete books by " + domNode.val() + "?")){
      this.removeBookbyAuthor(domNode.val());
      this.$container.find("#delete-books-frm")[0].reset();
      this.$container.find("#deletebookTitle").html(this._populateDelTitles());
      this.$container.find("#deletebookAuthor").html(this._populateDelAuthors());
    }
  } else {
    alert("Please select a Title or an Author")
  }
  return true;
};

$(function(){
  window.gDeleteBooksUI = new DeleteBooksUI($("#deleteBook"));
  window.gDeleteBooksUI.init();
  return true;
});
