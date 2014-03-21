# Changelog

### 2014-02-03: 1.1.1
- *[Bugfix]* Update `javve/events` version which fixes critical bugs in Safari for PC and PhantomJS (which makes the command line tests work again).
- *[Bugfix]* Clear search when clicking in the HTML5 clear button.
- *[Misc]* Add History.md file for changelog instead of having it at Listjs.com.

### 2014-02-03: 1.1.0
- *[Change]* The sorting API is update so it looks like this `listObj.sort('name', { order: "asc "})` and `listObj.sort('name', { order: "desc "})` instead or `listObj.sort('name', { desc: true/false })`.
- *[Feature]* Added support for default sort function `new List('id', { sortFunction: function(itemA, itemB) { .. }})</
- *[Feature]* Adding `data-order="asc/desc"` to a sort button makes that button only sort `asc` or `desc`, ie no to
- *[Bugfix]* Fix `grunt watch` bug.
- *[Bugfix]* Remove sorting when searching and filtering.
- *[Bugfix]* Fix sorting and search when using pagiation plugin


### 2014-01-17: 1.0.2
- *[Bugfix]* Fix error that broke the lib in IE8.

### 2013-11-12: 1.0.0
- *[Feature]* Add more events and enable to add them on initialization.
- *[Feature]* Add support for Component.js, Bower, RequireJS and CommonJS
- *[Feature]* Make it possible to remove event handlers by `.off('event', handler)`
- *[Improvement]* Many new tests
- *[Improvement]* Paging plugin default classes and structure now correspons to <a href="http://twitter.github.com/bootstrap/components.html#pagination">Twitter Bootstraps pagination</a>.
- *[Improvement]* Make sorting case-insensitive (thanks @thomasklemm)
- *[Improvement]* Add item._values for direct access to a items values. Simplifies debugging. Note: Always use item.values() when interacting with the values.
- *[Bugfix]* `.add(items, callbak)` with `callback` set does no longer add an extra item.
- *[Bugfix]* `templater.set()` no longer is called twice in a `templater.get()` call.
- *[Bugfix]* Fix error when trying to sort `undefined,null,etc` values.
- *[Bugfix]* Fix error when trying to search `undefined,null,etc` values.
- *[Bugfix]* Fix issue #51, problems with filters/search + paging.
- *[Misc]* Almost completely rewritten codebase and started using <a href="https://github.com/component/component">Component</a>
- *[Misc]* Moved the website into another repo called <a href="https://github.com/javve/list-website">list-website</a>
- *[Misc]* Add documentation for searching in specific columns.
- *[Change]* `listObj.get('valueName', value)` does now always returns an array. Previously it return an object if only one item matched and null if no match was found.
- *[Change]* The default sort order is now `asc` instead of `desc`.
- *[Change]* Syntax for searching in specific columns are now `.search('val', [ 'columnName', 'columnName2' ])` instead of `.search('val', { columnName: true, columnName2: true })`.
- *[Change]* Move plugins into seperated repos: <a href="https://github.com/javve/list.pagination.js">github.com/javve/list.pagination.js</a> and <a href="https://github.com/javve/list.fuzzysearch.js">github.com/javve/list.fuzzysearch.js</a>
- *[Change]* Plugin initiation have changed. See <a href="/docs/plugins">getting started with plugins


### 2012-04-24: 0.2.1
- Fuzzy Search plugin, `.filter()` changes and bug fixes *[Read more »](http://jonnystromberg.com/listjs-0-2-1-release-notes/)*

### 2012-01-23: 0.2.0
- Lots of updates and interesting features. *[Read more »](http://jonnystromberg.com/listjs-0-2-0-plugins-paging/)*

### 2011-12-15: 0.1.4
- `.filters()`, `.sort()` and `.search()` now deped on each other. If the list is filtered and then there is a search, the items hidden by the filters will stay hidden etc.
- `.filter()` is the only way to reset filter. `.filter(false)` does not work anymore.

### 2011-11-29: 0.1.3 release
- Added function `.clear()` that removes all items from the list
- Changed the sort function to be based on `data-sort` instead of `rel`
- When sorting one category, all sort-related classes will be removed from the other sort buttons
- Updated `.sort(valueName, sortFunction)` to `.sort(valueName, options)`, se more info in the documentation

### 2011-11-16: 0.1.2 release
- Sorting is now indicated by class `asc` or `desc` at sorting buttons
- Added three new small helper functions `hasClass(element, class)`, `addClass(element, class)</
    and `removeClass(element, class)`</li>

### 2011-10-20: 0.1.1 release
- Added possibility to reverse sort the list

### 2011-10-18: 0.1 release
- Examples at Listjs.com works in IE7,8,9 (IE6 is not tested, should work)
- More documentation
- Misc bug fixes

### 2011-10-15 Final alpha 0.3 release
- More documentation
- Only show 200 items at same time, huge speed increase
- Misc bug fixes

### 2011-08-08 Alpha 0.2 release
- Added asynchronous item adding
- Added asynchronous list indexing
- Improved (but incomplete) documentation
- Bugfixes and improved helper functions
- Show helper functions non-minified

### 2011-07-25 Alpha 0.1 release
