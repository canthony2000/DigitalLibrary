var _bookShelf = new Array();

window.book01 = new Book({bookCover : "cover",Title : "IT",Author : "Stephan King",Number_Of_Pages : 800,Publish_Date : "12/24/1987",Rating : 5,Synopsys : "great book"});
window.book02 = new Book({bookCover : "cover",Title : "Moby Dick",Author : "Herman Melville",Number_Of_Pages : 754,Publish_Date : "06/02/1851",Rating : 4,Synopsys : "Not Sure"});
window.book03 = new Book({bookCover : "cover",Title : "Animal Farm",Author : "George Orwell",Number_Of_Pages : 322,Publish_Date : "02/04/1945",Rating : 3,Synopsys : "Gotta go"});
window.book04 = new Book({bookCover : "cover",Title : "To Kill a Mockingbird",Author : "Harper Lee",Number_Of_Pages : 512,Publish_Date : "04/04/1965",Rating : 4,Synopsys : "Nope"});
window.book05 = new Book({bookCover : "cover",Title : "1984",Author : "George Orwell",Number_Of_Pages : 432,Publish_Date : "07/01/1950",Rating : 4,Synopsys : "Yeah!"});
window.book06 = new Book({bookCover : "cover",Title : "The Road to Wigan Pier",Author : "George Orwell",Number_Of_Pages : 212,Publish_Date : "03/23/1937",Rating : 5,Synopsys : "Sorta good"});
window.book07 = new Book({bookCover : "cover",Title : "Go Set a Watchman",Author : "Harper Lee",Number_Of_Pages : 223,Publish_Date : "01/13/2015",Rating : 5,Synopsys : "Nice"});
window.bookList = [book01,book02,book03,book04,book05,book06,book07];

//Add format date function

//var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
//d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
//https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

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
