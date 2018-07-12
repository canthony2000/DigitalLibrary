// var Book = function(bookCover,Title,author,numberOfPages,publishDate,rating,synopsys){
//   this.bookCover = bookCover;
//   this.Title = Title;
//   this.author = author;
//   this.numberOfPages = numberOfPages;
//   this.publishDate = new Date(publishDate);
//   this.rating = rating;
//   this.synopsys = synopsys;
// }

// var Book = function(bookCover,Title,Author,Number_Of_Pages,Publish_Date,Rating,synopsys){
//   this.bookCover = bookCover;
//   this.Title = Title;
//   this.Author = Author;
//   this.Number_Of_Pages = Number_Of_Pages;
//   this.Publish_Date = new Date(Publish_Date);
//   this.Rating = Rating;
//   this.Synopsys = synopsys;
// }

var Book = function(oArgs){
  this.bookCover = oArgs.bookCover;
  this.Title = oArgs.Title;
  this.Author = oArgs.Author;
  this.Number_Of_Pages = oArgs.Number_Of_Pages;
  this.Publish_Date = new Date(oArgs.Publish_Date);
  this.Rating = oArgs.Rating;
  this.Synopsys = oArgs.synopsys;
}
