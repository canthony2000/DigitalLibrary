var PaginationUI = function(container){
  Library.call(this);
  this.$container = container;
  this.bkCount;
  return true;
};

PaginationUI.prototype = Object.create(Library.prototype);

PaginationUI.prototype.init = async function () {
  this._bindEvents();
  this.bkCount = await this._handleGetBookCountDb();
  this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(0,window._booksPerPage,this.bkCount));
  this._handlePageSelectors();

  this._bindCustomListeners();
  return true;
};

PaginationUI.prototype._bindEvents = function () {
  //$("#suggest-authors-btn").on("click", $.proxy(this._handlePagination, this));
  return true;
};

PaginationUI.prototype._bindCustomListeners = function () {
  //$(document).on('objUpdate2', $.proxy(this._updateTable, this));
  this.$container.find('.page-link').on('click', $.proxy(this._getPageSet, this));
};

PaginationUI.prototype._handleResultsInfo = function (ctStart = 0, ctEnd = 0, ctTotal = 0) {

  let parentDiv = document.createElement("div");
  $(parentDiv).append($('<div/>', {'class': 'col-md-3 mt-2'}).append(
    $('<p/>', {'html': 'Results&nbsp'}).append(
      $('<span/>',{text:ctStart, 'class':'lib-page-results'}),
      "\xa0Through\xa0",
      $('<span/>',{text:ctEnd, 'class':'lib-page-results'}),
      "\xa0of\xa0",
      $('<span/>',{text:ctTotal, 'class':'lib-page-results'}),
      "\xa0Books"
      )
    )
  );
  return $(parentDiv);
};

PaginationUI.prototype._handlePageSelectors = function () {
  let noOfPages = Math.ceil(this.bkCount/window._booksPerPage);
  if (noOfPages > 1){
    let $ul = this.$container.find('.pagination');
    $ul.find('li:eq(1)').remove();
    for (var i = 0; i < noOfPages; i++) {
       $ul.find(`li:eq(${i})`).after($('<li>',{class:"page-item"}).append(
         $('<a>',{text:i+1, class:"page-link", href:"#"}))
       );
    }
  }
  return false;
};

PaginationUI.prototype._getPageSet = function (e) {
  //console.log(e);

  //<span aria-hidden="true">«</span>
  console.log(e.target.innerText.indexOf("«"));
  if (e.target.innerText.indexOf("«") === 0){
    console.log("down");
  }




  
  return false;
};



$(function(){
  window.gPaginationUI = new PaginationUI($("#paginationInfo"));
  window.gPaginationUI.init();
  return true;
});
