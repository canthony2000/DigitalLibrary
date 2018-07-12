var DataTable = function(container){
  Library.call(this);
  this.$container = $("#main-books-listing");
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this._getLibState();
  this._updateTable();
  this._bindEvents();
  this._bindCustomListeners();
};

DataTable.prototype._bindEvents = function () {
  //add native events here
};

DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate2', $.proxy(this._updateTable, this));
};

DataTable.prototype._updateTable = function (e) {
  var _self = this;
  var $thead = this.$container.find('thead');
  $thead.empty();
  //generate the table header
 $thead.append(_self._createHeader());

  if (_bookShelf.length) {
    var $tbody = this.$container.find('tbody');
    $tbody.empty();
    //generate the table body
    $.each(window._bookShelf, function(index, book){
      $tbody.append(_self._createRow(book));
    });
  }
  return;
};

DataTable.prototype._createHeader = function () {

  var getBookProps = new Book;
  var keys = Object.getOwnPropertyNames(getBookProps);
  var tr = document.createElement('tr');

  for (var key in keys) {
      var th = document.createElement('th');
      $(th).text(keys[key]);
      tr.append(th);
  }
//console.log(tr);
return tr;
}

DataTable.prototype._createRow = function (book) {


  var tr = document.createElement('tr');
  var colContent = [
    '<img src="assets/it-th.jpg" class="lib-tbl-th"></img>',
    '<td><input type="checkbox" class="chcktbl ml-4"></td>',
    '<button type="button" class="btn btn-outline-secondary btn-sm lib-edit-btn" data-toggle="modal" data-target="#editBookAttrib">Edit</button>',
  ];

  for(var key in book){
    var td = document.createElement('td');
    $(td).text(book[key]);
    tr.append(td);
  }

  //console.log(tr);

  //table adjustments
  $(tr).find('td:eq(0)').remove();
  var td = document.createElement('td');
  td.setAttribute("class", "th-container");
  td.innerHTML=colContent[0];
  tr.prepend(td);
  $(tr).find('td:eq(6)').remove();
  var td = document.createElement('td');
  td.innerHTML=colContent[1];
  tr.append(td);
  var td = document.createElement('td');
  td.innerHTML=colContent[2];
  tr.append(td);
  var td = $(tr).find('td:eq(4)');
  var aDate = td.html();
  d = new Date(aDate);
  td.text(d.getFullYear());

  return tr;
};

$(function(){
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
