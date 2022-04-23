## Softadmin code browser - SCB
This is only half of the project!
To run this site, you need a web service that returns the data in exactly the right way.

## Feature list
* Display all code objects in a data base, with its relation to all abjects calling this object and all beeing called from it. MenuItems and other Softadmin usages are also shown.
* Possibility to use all databases on the server based on query parameters.


## Feature wish list
# Code objects
[x] Add code highlighning
* Add version history browsing (Internal Softadmin version history)
* Display information about datetimeUpdate and UserUpdate
* List/search code objects in database (with filter)
* List/search databases on server
* Precalculation and display of all objects beeing called from the active code object, so that we can see the "weight" of all calls. For example, the total number of rows hidden behind a stored procedure.
* Link to open an object in SSMS.
* Stand alone version build into or easily installed into Softadmin
* All security vulnerabilities fixed.

# Softadmin
[x] Show menuItem information and links with navigation
* Show other objects with attached code, like Webservices and Snippets.
* Define a JSON struct to use with "Developer comments" for documentation purposes
 * Define workflows
 * Extra information