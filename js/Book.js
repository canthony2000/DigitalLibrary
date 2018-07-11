var Book = function(title,author,numberOfPages,publishDate,rating,synopsys,bookCover){
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
  this.rating = rating;
  this.synopsys = synopsys;
  this.bookCover = bookCover;
}



// var Book = function(oArgs){
//   this.title = oArgs.title;
//   this.author = oArgs.author;
//   this.numberOfPages = oArgs.numberOfPages;
//   this.publishDate = new Date(oArgs.publishDate);
//   this.rating = oArgs.rating;
//   this.synopsys = oArgs.synopsys;
//   this.bookCover = oArgs.bookCover;
// }
