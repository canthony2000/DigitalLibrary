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
  this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(1,window._booksPerPage,this.bkCount));
  this._handlePageSelectors();
  this._handlePageDropdown();
  this._bindCustomListeners();
  return true;
};

PaginationUI.prototype._bindEvents = function () {
  this.$container.find('.pagination').on('click', $.proxy(this._getPageSet, this));
  this.$container.find('#pageSetSelect').on('change', $.proxy(this._getPageSetDropdown, this));
  return true;
};

PaginationUI.prototype._bindCustomListeners = function () {
  $(document).on('booksAddOrDel', $.proxy(this._resetAddDel, this));
};

PaginationUI.prototype._resetAddDel = async function(){
  this.bkCount = await this._handleGetBookCountDb();
  this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(1,window._booksPerPage,this.bkCount));
  this._handlePageSelectors();
  this._handlePageDropdown();
  this._handleGetBooksDb();
};

PaginationUI.prototype._handleResultsInfo = function (ctStart = 0, ctEnd = 0, ctTotal = 0) {
  let parentDiv = document.createElement("div");
  $(parentDiv).append($('<div/>', {'class': 'col-md-3 mt-2'}).append(
    $('<p/>', {'html': 'Results&nbsp'}).append(
      $('<span/>',{text:ctStart, 'class':'lib-page-start'}),
      "\xa0Through\xa0",
      $('<span/>',{text:ctEnd, 'class':'lib-page-end'}),
      "\xa0of\xa0",
      $('<span/>',{text:ctTotal, 'class':'lib-page-total'}),
      "\xa0Books"
      )
    )
  );
  return $(parentDiv);
};

PaginationUI.prototype._handlePageSelectors = function (page = 1) {
  let noOfPages = Math.ceil(this.bkCount/window._booksPerPage);
  if (noOfPages > 1){
    let $ul = this.$container.find('.pagination');
    $ul.empty();
    $ul.append($('<li>',{class:'page-item'}).append(
      $('<a>',{class:'page-link', href:'#', 'aria-label':'Previous'}).append(
        $('<span>',{'aria-hidden':'true', html:'&laquo;'}),($('<span>',{class:'sr-only', text:'Previous'}))
        )
      )
    );
    for (var i = 0; i < noOfPages; i++) {
      $ul.find(`li:eq(${i})`).after($('<li>',{class:'page-item'}).append(
        $('<a>',{text:i+1, class:"page-link", href:"#"}))
      );
    }
    $ul.append($('<li>',{class:'page-item'}).append(
      $('<a>',{class:'page-link', href:'#', 'aria-label':'Previous'}).append(
        $('<span>',{'aria-hidden':'true', html:'&raquo;'}),($('<span>',{class:'sr-only', text:'Next'}))
        )
      )
    );
    $ul.find(`li:eq(${page})`).attr("class", "page-item active")
  }
  return page;
};

PaginationUI.prototype._handlePageDropdown = function (page = -1) {
  let $select = this.$container.find('#pageSetSelect');
  let pageVal = 1;
  if(page === -1){
    $select.empty();
    $select.append($('<option>',{text:'Choose...', value: '{"book":0,"page":1}'}));
    for (let i = 0; i < this.bkCount; i = i + window._booksPerPage) {
      let optVal = `{"book":${i},"page":${pageVal++}}`;
      $select.append($('<option>',{text:`${i+1} - ${i + window._booksPerPage > this.bkCount ? this.bkCount : i + window._booksPerPage}`, value:optVal}));
    };
  } else {
    $select.find(`option:eq(${page})`).prop('selected', true);
  };
}

PaginationUI.prototype._getPageSetDropdown = function (e) {
 var vals = $.parseJSON(e.target.value);
 this._handleGetBooksDb(vals.book, window._booksPerPage);
 this._handlePageSelectors(vals.page);
 this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(vals.book + 1,vals.book + window._booksPerPage,this.bkCount));

};

PaginationUI.prototype._getPageSet = function (e) {
  let fetchStart;
  let rs = (val) => {
    fetchStart = this._handlePageSelectors(+this.$container.find('.active').text()+val) * window._booksPerPage - window._booksPerPage;
    this._handlePageDropdown(this.$container.find('.active').text())
    this._handleGetBooksDb(fetchStart, window._booksPerPage);
    this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(fetchStart + 1, fetchStart + window._booksPerPage > this.bkCount ? this.bkCount : fetchStart + window._booksPerPage, this.bkCount));
  }

  if(~e.target.innerText.indexOf('«')) {
    if(this.$container.find('.active').text() != this.$container.find('.lib-page-start').text()) rs(-1);
    return false;
  };

  if(~e.target.innerText.indexOf('»')) {
    if(this.$container.find('.active').text() != Math.ceil(this.bkCount/window._booksPerPage)) rs(1);
    return false;
  };

  fetchStart = e.target.innerText * window._booksPerPage - window._booksPerPage;
  this._handlePageSelectors(e.target.innerText);
  this._handlePageDropdown(e.target.innerText);
  this._handleGetBooksDb(fetchStart);
  this.$container.find('.col-md-3').eq(0).html(this._handleResultsInfo(fetchStart + 1, fetchStart + window._booksPerPage > this.bkCount ? this.bkCount : fetchStart + window._booksPerPage, this.bkCount));
  return false;
};

$(function(){
  window.gPaginationUI = new PaginationUI($("#paginationInfo"));
  window.gPaginationUI.init();
  return true;
});
