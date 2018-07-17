var SuggestAuthorsUI = function(container){
  Library.call(this);
  this.$container = container;
  return true;
};

SuggestAuthorsUI.prototype = Object.create(Library.prototype);

SuggestAuthorsUI.prototype.init = function () {
  this._bindEvents();
  return true;
};

SuggestAuthorsUI.prototype._handleSuggestAuthors = function () {
  var suggestedAuthor = this.getRandomAuthorName();
  if(suggestedAuthor.length){
    this.$container.modal("show");
    this.$container.find("li").html(suggestedAuthor);
  } else {
    alert("Nothing in library!");
  }
  return false;
};

SuggestAuthorsUI.prototype._bindEvents = function () {
  $("#suggest-authors-btn").on("click", $.proxy(this._handleSuggestAuthors, this));
  return true;
};

$(function(){
  window.gSuggestAuthorsUI = new SuggestAuthorsUI($("#suggestAuthor"));
  window.gSuggestAuthorsUI.init();
  return true;
});
