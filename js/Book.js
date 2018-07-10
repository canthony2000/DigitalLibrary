var Book = function(title,author,numberOfPages,publishDate,rating,synopsys,bookCover){
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
  this.rating = rating;
  this.synopsys = synopsys;
  this.bookCover = bookCover;
}
