var Book = function(title,author,numberOfPages,publishDate){
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate);
}
