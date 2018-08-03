var PaginationUI = function(container){
  Library.call(this);
  this.$container = container;
  return true;
};

PaginationUI.prototype = Object.create(Library.prototype);

PaginationUI.prototype.init = function () {
  this._bindEvents();
  this._handlePagination();

  return true;
};

PaginationUI.prototype._bindEvents = function () {
  //$("#suggest-authors-btn").on("click", $.proxy(this._handlePagination, this));
  return true;
};

PaginationUI.prototype._handlePagination = function () {


  
  this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(6,10,233));
  return false;
};

PaginationUI.prototype._handleResultsInfo = function (ctStart = 0, ctEnd = 0, ctTotal = 0) {
  var parentDiv = document.createElement("div");
  $(parentDiv).append($('<div/>', {'class': 'col-md-3 mt-2'}).append(
    $('<p/>', {'html': 'Results&nbsp'}).append(
      $('<span/>',{text:ctStart, 'class':'lib-page-results'}),
      "\xa0through\xa0",
      $('<span/>',{text:ctEnd, 'class':'lib-page-results'}),
      "\xa0of\xa0",
      $('<span/>',{text:ctTotal, 'class':'lib-page-results'}),
      "\xa0books"
      )
    )
  );
  return $(parentDiv);
};

PaginationUI.prototype._handlePageLinks = function () {
  //return $('<article/>', {'class': 'row', 'data-id': oComment._id})
  // return $('<div/>', {'class': 'col-md-3 mt-2'}).append(
  //   $('<p/>', {'text': 'Results 1 through 5 of 200'})
  // );
  return false;
};



$(function(){
  window.gPaginationUI = new PaginationUI($("#paginationInfo"));
  window.gPaginationUI.init();
  return true;
});
