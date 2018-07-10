var _bookShelf = new Array();


  window.book01 = new Book("IT","Stephan King", 800, "12/24/1987");
  window.book02 = new Book("Moby Dick","Herman Melville", 754, "06/02/1851");
  window.book03 = new Book("Animal Farm","George Orwell", 322, "02/04/1945");
  window.book04 = new Book("To Kill a Mockingbird","Harper Lee", 512, "04/04/1965");
  window.book05 = new Book("1984","George Orwell", 432, "07/01/1950");
  window.book06 = new Book("The Road to Wigan Pier","George Orwell", 212, "03/23/1937");
  window.book07 = new Book("Go Set a Watchman","Harper Lee", 223, "01/13/2015");
  window.bookList = [book01,book02,book03,book04,book05,book06,book07]

//Add format date function

//************table check All
$('#chckHead').click(function () {
  if (this.checked == false) {
      $('.chcktbl:checked').attr('checked', false);
  } else {
      $('.chcktbl:not(:checked)').attr('checked', true);
  }
});
  $('#chckHead').click(function () {
});

//************File Upload

function bs_input_file() {
	$(".input-file").before(
		function() {
			if ( ! $(this).prev().hasClass('input-ghost') ) {
				var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
				element.attr("name",$(this).attr("name"));
				element.change(function(){
					element.next(element).find('input').val((element.val()).split('\\').pop());
				});
				$(this).find("button.btn-choose").click(function(){
					element.click();
				});
				$(this).find("button.btn-reset").click(function(){
					element.val(null);
					$(this).parents(".input-file").find('input').val('');
				});
				$(this).find('input').css("cursor","pointer");
				$(this).find('input').mousedown(function() {
					$(this).parents('.input-file').prev().click();
					return false;
				});
				return element;
			}
		}
	);
}
$(function() {
	bs_input_file();
});
