var Book = function(oArgs){
  this.bookCover = oArgs.bookCover;
  this.Title = oArgs.Title;
  this.Author = oArgs.Author;
  this.Number_Of_Pages = Number(oArgs.Number_Of_Pages);
  this.Publish_Date = new Date(oArgs.Publish_Date);
  this.Rating = Number(oArgs.Rating);
  this.Synopsys = oArgs.Synopsys;
}
