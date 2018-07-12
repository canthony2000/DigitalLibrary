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
  this._TableRowButtons();
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

  // var getBookProps = new Book;

  var getBookProps = new Book({
  bookCover : "",
  Title : "",
  Author : "",
  Number_Of_Pages : "",
  Publish_Date : "",
  Rating : "",
  Synopsys : ""
  });

  var keys = Object.getOwnPropertyNames(getBookProps);
  var tr = document.createElement('tr');

  for (var key in keys) {
      var th = document.createElement('th');
      th.setAttribute("scope","col");
      $(th).text(keys[key].replace(/_/g, " "));
      tr.append(th);
  }

var textinsert = "Delete  <input type='checkbox' id='chckHead' class='ml-1'>";
  $(tr).find('th:eq(0)').text("");
  $(tr).find('th:eq(6)').empty();
  $(tr).find('th:eq(6)').html(textinsert);
  var th = document.createElement('th');
  th.innerHTML="Edit";
  tr.append(th);
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
    td.setAttribute("scope","row");
    $(td).text(book[key]);
    tr.append(td);
  }

  //table adjustments
  $(tr).find('td:eq(0)').remove();
  var td = document.createElement('td');
  td.setAttribute("class", "th-container",);
  td.setAttribute("scope", "row",);
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

DataTable.prototype._TableRowButtons = function (book) {
  $('#chckHead').click(function () {
  if (this.checked == false) {
      $('.chcktbl:checked').attr('checked', false);
  } else {
      $('.chcktbl:not(:checked)').attr('checked', true);
  }
  });
  $('#chckHead').click(function () {
  });
};

$(function(){
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
