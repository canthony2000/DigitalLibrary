# Digital Library JavaScript Class

Created by Corey Anthony

## Points for discussion during code review:

Delegation that when the table changes it re-binds the buttons.
Keys on each td to reference with find so that adjusting columns is completely detached (not hard) coded

## Features:
-Node server and CRUD routes using mongoose methods
-Async/await used when books are updated in mongodb
-Table headers are pulled dynamically from the book property names
-jQuery init(), bindEvents(), and eventHandlers()
-GET, POST, PUT, and DELETE Ajax requests
-Local Storage
-posting of collections of books to the mongo db
-Singleton design pattern
-observer design pattern
-Mongodb using mLabs mongo database in cloud
-custom event handlers updates the table when changes are made
-form serialization is used from add books form into the book object.
-Mongodb updates, local storage, and dynamic table generation will automatically compensate if a new data point is added.  The only changes needed are adding a field to the add books form and addition of the corresponding property to the books object constructor.
-event properties are used to change the behavior of the search button to toggle between search results and default book listing on the books table.

## Tools used:
Atom IDE - for code editor
Postman - for sending requests to Mongodb
Robo 3T - for administering mLabs mongodb instance
Node server - ReST layer
Git/Git Hub - Code repository
Sourcetree - Git repository management

## Node packages used:
body-parser
cors
express
mongoose

## Other:
