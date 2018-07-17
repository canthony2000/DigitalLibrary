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

## Other:

-add a reset/toggle button for resetting the home page book table after a search.
-perform a check when adding books to see if a book is in the library before adding it to the add queue.
