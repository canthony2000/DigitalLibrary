# Digital Library JavaScript Class

Created by Corey Anthony

## Points for discussion during code review:

Bind event on delete checkbox quits working when table rows deleted and table is updated.  Had to redo the bind event in the function that updates the row to re-attach it.  So it is bound wwhen the buttons are created and not in the custom bind events method.  Is there a better way?

Kyle suggested a delegation so that when the table changes it re-binds the buttons.

Created keys on each td to reference with find so that adjusting columns is completely detached (not hard) coded

## UI Classes:

UI super classes that prototype Library

```
ShowAuthorsUI
AddBooksUI
```
## Features:
-Table headers are pulled from the book property names
-custom event handlers updates the table when changes are made
-form serialization is used from add books form into the book object.  Local storage and dynamic table generation will automatically compensate if a new data point is added.  The only changes needed are adding a field to the add books form and adding a property to the books class.
-event properties are used to change the behavior of the search button to toggle between search results and default book listing on the books table.



## Other:

-refine reset/toggle button for resetting the home page book table after a search.  Needs reset search field after resetting to default results and setting label to search after deleting a book from search results.
-perform a check when adding books to see if a book is in the library before adding it to the add queue.
