// var Book = function(bookCover,Title,author,numberOfPages,publishDate,rating,synopsys){
//   this.bookCover = bookCover;
//   this.Title = Title;
//   this.author = author;
//   this.numberOfPages = numberOfPages;
//   this.publishDate = new Date(publishDate);
//   this.rating = rating;
//   this.synopsys = synopsys;
// }

var Book = function(bookCover,Title,Author,Number_Of_Pages,Publish_Date,Rating,synopsys){
  this.bookCover = bookCover;
  this.Title = Title;
  this.Author = Author;
  this.Number_Of_Pages = Number_Of_Pages;
  this.Publish_Date = new Date(Publish_Date);
  this.Rating = Rating;
  this.Synopsys = synopsys;
}
