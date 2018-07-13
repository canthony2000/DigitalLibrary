var DataTable = function(container){
  Library.call(this);
  this.$container = $("#main-books-listing");
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this._getLibState();
  this._updateTable();
  this._bindEvents();
  this._TableRowButtons();
  this._bindCustomListeners();
};

DataTable.prototype._bindEvents = function () {
  //add native events here
};

DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate2', $.proxy(this._updateTable, this));
  this.$container.find('.lib-del-label').on('click', $.proxy(this._delClick, this));
};

DataTable.prototype._updateTable = function (e) {
  var _self = this;
  var $thead = this.$container.find('thead');
  $thead.empty();
  //generate the table header
 $thead.append(_self._createHeader());

//append additional columns
  if (_bookShelf.length) {
    var $tbody = this.$container.find('tbody');
    $tbody.empty();
    //generate the table body
    $.each(window._bookShelf, function(index, book){
      $tbody.append(_self._createRow(book));
    });
  } else { // if bookshelf becomes empty by deleting books
    var $tbody = this.$container.find('tbody');
    $tbody.empty();
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute("class", "text-center");
    td.setAttribute("colspan", "8");
    $(td).text("Your bookshelf is empty.")
    tr.append(td);
    $tbody.append(tr);
  }
  this._TableRowButtons();
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

var textinsert = "<span>Delete</span><input type='checkbox' id='chckHead' class='ml-1'>";
  $(tr).find('th:eq(0)').text("");
  $(tr).find('th:eq(6)').empty();
  $(tr).find('th:eq(6)').html(textinsert);

  var th = document.createElement('th');
  //$th = $(tr).find('th:eq(6)');
  //$th.attr("class","lib-del-label");
  $span = $(tr).find('span');
  $span.attr("class","lib-del-label");

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
  };

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
  var td = $(tr).find('td:eq(5)');
  var imgSrc = "<img class='lIcon' src='assets/rate" + td.text() + ".svg'>"
  td.html(imgSrc);

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
  return true;
};

DataTable.prototype._delClick = function () {
  //var titlesToDelete = [];
  this.$container.find('.chcktbl').each(function(i, ckBox) {
    var cBox = ckBox;
    if($(cBox).is(':checked')){
      var $tr = $(cBox).closest('tr');
      var td = $tr.find('td:eq(1)');
      var bookTitle = td.text();
      //this.removeBookbyTitle(td.val());
      this.removeBookbyTitle(bookTitle);
      //console.log(bookTitle);
    }
  })
  //console.log(titlesToDelete);
  //this.removeBookbyTitle(titlesToDelete);
  return true;
};

$(function(){
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
