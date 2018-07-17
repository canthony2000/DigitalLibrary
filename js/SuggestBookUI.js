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

  if(window._bookShelf.length){
    this.$container.modal("show");
    var bkObj = this.getRandomBook();
    var $targetField = this.$container.find('.card-body');
    $targetField.find(".card-title").text(bkObj.Title);
    var elemHTML = "by " + bkObj.Author + "<br> Published in " + d.getFullYear() + "<br>" + bkObj.Number_Of_Pages + " Pages";
    $targetField.find("p").html(elemHTML);
    elemHTML = "assets/rate" + bkObj.Rating + ".svg";
    $targetField.find("img").attr("src",elemHTML);
  } else {
    alert("Nothing in library!");
  };
  return false;
};

SuggestBookUI.prototype._bindEvents = function () {
  $("#suggest-book-btn").on("click", $.proxy(this._handleSuggestBooks, this));
  return true;
};

$(function(){
  window.gSuggestBookUI = new SuggestBookUI($("#suggestBook"));
  window.gSuggestBookUI.init();
  return true;
});
