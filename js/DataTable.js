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
  var $tbody = this.$container.find('tbody');
  $tbody.empty();

  $.each(window._bookShelf, function(index, book){
    $tbody.append(_self._createRow(book));
  });
  //return "table generated";
};

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

  var td = document.createElement('td');
  td.setAttribute("class", "th-container");
  td.innerHTML=colContent[0];
  tr.prepend(td);
  var td = document.createElement('td');
  td.innerHTML=colContent[1];
  tr.append(td);
  var td = document.createElement('td');
  td.innerHTML=colContent[2];
  tr.append(td);
  $(tr).find('td:eq(5)').remove();
  $(tr).find('td:eq(6)').remove();

  var aDate = $(tr).find('td:eq(4)').html();

  //d = new date("12/12/2018");
  //getFullYear(aDate);
  console.log(aDate);
  //$(tr).find('td:eq(4)').html() = $(tr).find('td:eq(4)').html()


console.log(tr);
  return tr;
};

$(function(){
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
