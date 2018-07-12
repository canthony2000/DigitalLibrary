var _bookShelf = new Array();


  window.book01 = new Book({
    bookCover : "cover",
    Title : "IT",
    Author : "Stephan King",
    Number_Of_Pages : 800,
    Publish_Date : "12/24/1987",
    Rating : 5,
    Synopsys : "great book"
  });

  window.book02 = new Book({
    bookCover : "cover",
    Title : "Moby Dick",
    Author : "Herman Melville",
    Number_Of_Pages : 754,
    Publish_Date : "06/02/1851",
    Rating : 4,
    Synopsys : "Not Sure"
  });

    window.book03 = new Book({
      bookCover : "cover",
      Title : "Animal Farm",
      Author : "George Orwell",
      Number_Of_Pages : 322,
      Publish_Date : "02/04/1945",
      Rating : 3,
      Synopsys : "Gotta go"
    });

  window.bookList = [book01,book02,book03];


  // window.book02 = new Book("cover","Moby Dick","Herman Melville", 754, "06/02/1851",4,"Not Sure");
  // window.book03 = new Book("cover","Animal Farm","George Orwell", 322, "02/04/1945",3,"Gotta go");
  // window.book04 = new Book("cover","To Kill a Mockingbird","Harper Lee", 512, "04/04/1965",2,"Nope");
  // window.book05 = new Book("cover","1984","George Orwell", 432, "07/01/1950",5,"great book","Yeah");
  // window.book06 = new Book("cover","The Road to Wigan Pier","George Orwell", 212, "03/23/1937",5,"Sorta good");
  // window.book07 = new Book("cover","Go Set a Watchman","Harper Lee", 223, "01/13/2015",5,"Nice");
  // window.bookList = [book01,book02,book03,book04,book05,book06,book07]

//Add format date function

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
