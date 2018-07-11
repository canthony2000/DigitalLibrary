var DeleteBooksUI = function(container){
  Library.call(this);
  this.$container = container;
};

DeleteBooksUI.prototype = Object.create(Library.prototype);

DeleteBooksUI.prototype.init = function () {
  this._bindEvents();
  return false;
};

DeleteBooksUI.prototype._bindEvents = function () {
  $("#del-book-btn").on("click", $.proxy(this._handleDeleteBooks, this));
  $("#deletebookTitle").on("change", $.proxy(this._toggleTitleAuthor, this, status=1));
  $("#deletebookAuthor").on("change", $.proxy(this._toggleTitleAuthor, this, status=0));
  $("#del-selected-books-btn").on("click", $.proxy(this._deleteSelectedBooks, this));
  return false;
};

DeleteBooksUI.prototype._handleDeleteBooks = function () {
  this.$container.modal("show");
  this.$container.find("#deletebookTitle").html(this._populateDelTitles());
  this.$container.find("#deletebookAuthor").html(this._populateDelAuthors());
}

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
}

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
}

DeleteBooksUI.prototype._toggleTitleAuthor = function (status) {
  if(status === 1){
    $('#deletebookAuthor').prop('selectedIndex',0);
  } else{
    $('#deletebookTitle').prop('selectedIndex',0);
  }
}

DeleteBooksUI.prototype._deleteSelectedBooks = function (status) {
  var domNode = $('#deletebookTitle');
  if (domNode.val() != "0") {
    if (confirm("Are you sure that you want to delete the book " + domNode.val() + "?")){
      this.removeBookbyTitle(domNode.val());
      //console.log("delete book title " + domNode.val());
    }
  } else if((domNode = $('#deletebookAuthor')).val() != "0") {
    if (confirm("Are you sure that you want to delete books by " + domNode.val() + "?")){
      this.removeBookbyAuthor(domNode.val());
      //console.log("delete books by author " + domNode.val());
    }
  } else {
    alert("Please select a Title or an Author")
  }
}

$(function(){
  window.gDeleteBooksUI = new DeleteBooksUI($("#deleteBook"));
  window.gDeleteBooksUI.init();
});
