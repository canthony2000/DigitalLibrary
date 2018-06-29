#Digital Library Class

Why in the singleton does Library not need a var in front of it, and if you add var it just creates an empty function called Library?  (Even though when not using singleton)

Because originally var Library was in scope, and in the singleton using var limits Library declaration to the scope of the singleton variable, but with no ‘var’ in the declaration Library is global and all of its properties and methods are included when it is declared.



***********

Discuss declaring new objects outside for loop and then assigning values to it in an array.  The array holds only references to the variable declared outside the loop.

Advanced search criteria:

gLibrary.getBookBySearchTerm("kill") //books with kill in the title
gLibrary.getBookBySearchTerm("sdfsdf1984sff1999gsfg") //books pulling out first occurrence of a year from a string
gLibrary.getBookBySearchTerm("sdfsdf800sff300gsfg") //books pulling out first occurrence of page number from a string +- 75 pages
gLibrary.getBookBySearchTerm(800) // books with 800 pages +- 75 pages passing a number
gLibrary.getBookBySearchTerm(1984) //books with title 1984 and pub year 1987 +- 10 years passing number
gLibrary.getBooksbyYear("1984") //books with title 1984 and pub year 1987 +- 10 years passing a string
gLibrary.getBookBySearchTerm("el") //get books from authors and titles

gLibrary.list()
gLibrary.getAuthors()
gLibrary.getRandomAuthorName()
gLibrary.removeBookbyAuthor("George Orwell")
gLibrary.addBooks()
gLibrary.addBook(new Book("The Great Alone","Kristin Hannah", 435, "03/23/1974"));
