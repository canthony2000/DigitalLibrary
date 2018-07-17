var SuggestBookUI= function(container){
  Library.call(this);
  this.$container = container;
  return true;
};

SuggestBookUI.prototype = Object.create(Library.prototype);

SuggestBookUI.prototype.init = function () {
  this._bindEvents();
  return true;
};

SuggestBookUI.prototype._handleSuggestBooks = function () {
  //var books = this.getTitles();
  if(window._bookShelf.length){
    this.$container.modal("show");
    //do stuff here, example:
    //this.$container.find(".modal-body").html(this._createUlOfAuthors(authors));
  } else {
    alert("Nothing in library!");
  }
  return false;
};

SuggestBookUI.prototype._bindEvents = function () {
  $("#suggest-book-btn").on("click", $.proxy(this._handleSuggestBooks, this));
  return true;
};

// ShowBooksUI.prototype._createUlOfAuthors = function (authors) {
//   var ul = document.createElement("ul");
//   for (var i = 0; i < authors.length; i++) {
//     var li = document.createElement("li");
//     $(li).text(authors[i]);
//     ul.append(li)
//   }
//   return ul;
// };

$(function(){
  window.gSuggestBookUI = new SuggestBookUI($("#suggestBook"));
  window.gSuggestBookUI.init();
  return true;
});
