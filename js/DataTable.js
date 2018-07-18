var DataTable = function(container){
  Library.call(this);
  this.$container = container;
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this._getLibState();
  this._updateTable();
  this._bindEvents();
  this._TableRowButtons();
  this._bindCustomListeners();
  return true;
};

DataTable.prototype._bindEvents = function () {
  //add native events here
};

DataTable.prototype._bindCustomListeners = function () {
  $(document).on('objUpdate2', $.proxy(this._updateTable, this));
  this.$container.find('.lib-del-label').on('click', $.proxy(this._delClick, this));
  //this.$container.on('click','.lib-del-label', $.proxy(this._delClick, this));
};

DataTable.prototype._updateTable = function (e) {
  // if(e){
  //   console.log(e.detail.data);
  // };

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

    if(e && e.detail.data === "search"){
      $.each(window._bookSearchResults, function(index, book){
        $tbody.append(_self._createRow(book));
      });

    } else {
      $.each(window._bookShelf, function(index, book){
        $tbody.append(_self._createRow(book));
      });
    };
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
  };
  this._TableRowButtons();
  return;
};

DataTable.prototype._createHeader = function () {

  var getBookProps = new Book("");
  var keys = Object.getOwnPropertyNames(getBookProps);
  var tr = document.createElement('tr');

  for (var key in keys) {
      var th = document.createElement('th');
      th.setAttribute("scope","col");
      th.setAttribute("class","lib_" + keys[key] + "_key");
      $(th).text(keys[key].replace(/_/g, " "));
      tr.append(th);
  }

  var textinsert = "<span>Delete</span><input type='checkbox' id='chckHead' class='ml-1'>";
   $(tr).find('.lib_bookCover_key').text("");
   $(tr).find('.lib_Synopsys_key').empty();
   $(tr).find('.lib_Synopsys_key').html(textinsert);

  var th = document.createElement('th');
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
    '<img src=' + imgText + ' class="lib-tbl-th"></img>',
    '<td><input type="checkbox" class="chcktbl ml-4"></td>',
    '<button type="button" class="btn btn-outline-secondary btn-sm lib-edit-btn" data-toggle="modal" data-target="#editBookAttrib">Edit</button>',
  ];

  for(var key in book){
    var td = document.createElement('td');
    //console.log("col_" + key + "_key");
    td.setAttribute("scope","row");
    td.setAttribute("class","lib_" + key + "_key");
    $(td).text(book[key]);
    tr.append(td);
  };

  //table adjustments
  var td = $(tr).find('.lib_bookCover_key');
  td.attr("class", "th-container",);
  td.attr("scope", "row",);
  var imgText = '<img src=' + td.text() + ' class="lib-tbl-th"></img>';
  td.html(imgText);
  $(tr).find('.lib_Synopsys_key').remove();
  var td = document.createElement('td');
  td.innerHTML=colContent[1];
  tr.append(td);
  var td = document.createElement('td');
  td.innerHTML=colContent[2];
  tr.append(td);
  var td = $(tr).find('.lib_Publish_Date_key');
  var aDate = td.html();
  d = new Date(aDate);
  td.text(d.getFullYear());
  var td = $(tr).find('.lib_Rating_key');
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
  this.$container.find('.lib-del-label').on('click', $.proxy(this._delClick, this));
  return true;

};

DataTable.prototype._delClick = function () {
  var _self = this; //Example of how Jquery hijacks this. context
  this.$container.find('.chcktbl').each(function(i, ckBox) {
     var cBox = ckBox;
     if($(cBox).is(':checked')){
       var $tr = $(cBox).closest('tr');
       var td = $tr.find('td:eq(1)');
       var bookTitle = td.text();
       _self.removeBookbyTitle(bookTitle)
     }
  })
  return true;
};

$(function(){
  window.gDataTable = new DataTable($("#main-books-listing"));
  window.gDataTable.init();
  return true;
});
