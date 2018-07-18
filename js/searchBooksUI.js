var SearchBookUI = function(container){
  Library.call(this);
  this.$container = container;
  return true;
};

SearchBookUI.prototype = Object.create(Library.prototype);

SearchBookUI.prototype.init = function () {
  this._bindEvents();
  return true;
};

SearchBookUI.prototype._handleSearchBook = function (e) {

  if (e.target.innerHTML === "Search"){
    e.target.innerHTML = "Reset"
  } else {
    e.target.innerHTML = "Search"
    this._handleEventTrigger("objUpdate2", {detail: {data: "refresh"}});
    return false;
  };

  if($("input").val()){
    window._bookSearchResults = this.getBookBySearchTerm($("input").val());
    this._handleEventTrigger("objUpdate2", {detail: {data: "search"}});
  } else {
    alert("Please enter a search term");
    e.target.innerHTML = "Search"
    this._handleEventTrigger("objUpdate2", {detail: {data: "refresh"}});
  };
};

SearchBookUI.prototype._bindEvents = function () {
  $("#search-btn").on("click", $.proxy(this._handleSearchBook, this));
  return true;
};

$(function(){
  window.gSearchBookUI = new SearchBookUI($("SearchContainer"));
  window.gSearchBookUI.init();
  return true;
});
