# Changelog

### 2.3.0 - 2020-11-25

- **[Feature]** #682 Multiple word search
- **[Feature]** #683 Debounced keyup handler in search
- **[Improvement]** #679 Faster search
- **[Website]** #684 Add more documentation for automagical search and sort elements

### 2.1.0 - 2020-11-21

- **[Feature]** #634 Add item template function
- **[Feature]** #591 Support adding custom pagination item
- **[Bugfix]** #667 Fix `getAttribute` fallback method
- **[Bugfix]** #636 Aviod strange ie11 bug
- **[Bugfix]** #570 Don't empty original value array when adding items async
- **[Misc]** #637 Reuse iteration indices

### 2.0.0 - 2020-11-21 - Winter cleanup 🧹

- **[Breaking]** Drop support for IE6-8
- **[Misc]** Update dev dependencies to latest version: Webpack 3.12.0 -> 5.6.0, jest 23.3 -> 26.6.3, jquery 3.3.1 -> 3.5.1, Removed: jshint jshint-loader
- **[Misc]** Replace uglify-js with terser
- **[Misc]** Update Node for dev from 6.15 to 14.15.1
- **[Misc]** Prettier on everything
- **[Misc]** Make release script simpler
- **[Misc]** Rename History.md to CHANGELOG.md
- **[Misc]** Use `babal-loader` with `@babel/preset-env` for supporting IE9-11
- **[Misc]** Add source-maps to `/dist`
- **[Misc]** Added WISHLIST.md for feature requests to allow cleanup of issue list.
- **[Misc]** Update CircleCI from 1.0 to 2.0
- **[Website]** Update Jekyll to remove security warnings
- **[Website]** Fix all examples (sorry that they we're broken)
- **[Website]** Use https instead of http for listjs.com
- **[Website]** Update Contribute guidelines [See commit →](https://github.com/javve/list.js/commit/6242496de2ac5c07903fb1590a5cb5129f0887a7)
- **[Bugfix]** Use one event listener per pagination and select page via data attributes
  [See commit →](https://github.com/javve/list.js/commit/7610c59039f3b39f52175cd1a200e935664869e8)
- **[Bugfix]** Don't break pagination if page=0
  [See commit →](https://github.com/javve/list.js/commit/b3db0de731d436422e016b5e17f7ceab5941cd5d)
  [See commit →](https://github.com/javve/list.js/commit/725bc188d7ba72c7d234bda1e09fc50b40661310)

### 2017-01-29 v1.5.0

- **[Feature]** Bundle fuzzySearch and pagination plugins into List.js  
  [See commit →](https://github.com/javve/list.js/commit/2f5322fd139ee6f30cef3bb5e15d382ff29f9489)
- **[Misc]** Switch from Grunt to Webpack and from Mocha to Jest  
  [See commit →](https://github.com/javve/list.js/commit/8376ef01b1da4b6e60a7457d628d97a803a82e14)

### 2017-01-19 v1.4.1

- **[Bugfix]** Move string-natural-compare to dependencies instead of devDependencies
  [See commit →](https://github.com/javve/list.js/commit/c17162b26fd5093d3ddde01e11a3f748310d993c)

### 2017-01-15 v1.4.0

- **[Bugfix/Feature]** Change natural-sort library to support custom alphabets
  and thereby handle JavaScripts unicode bugs like sorting ÅÄÖ in Swedish wrong.
  [See commit →](https://github.com/javve/list.js/commit/81e1386bed88d1f932e729feca2b3649e489bdfe)

### 2016-10-23 v1.3.0

- **[Bugfix]** Make mkdir in build script OS agnostic
  [See commit →](https://github.com/javve/list.js/commit/ba387125efddd7f5f4f8360bce516ae740cb5ae5)
- **[Bugfix]** Make it possible to reset search columns
  [See commit →](https://github.com/javve/list.js/commit/37edc1b98bf63a684d633f29e2f52106c21eaf7d)
- **[Bugfix]** Allow empty list without template.
  [See commit →](https://github.com/javve/list.js/commit/95329b945c64c0ad0693df120ef00547eac9b029)
- **[Bugfix]** Make it possible to use <tr> as string template
  [See commit →](https://github.com/javve/list.js/commit/38583e097cb75e369779b46c6129e1b8b8324f24)
- **[Misc]** Update NaturalSort to 0.8.1
  [See commit →](https://github.com/javve/list.js/commit/42d3db491801677c63238d5db3e0e9257087999a)
- **[Misc]** Use local Browserify
  [See commit →](https://github.com/javve/list.js/commit/83f6502dcea428fa2de2513d19ac71f82905ecb8)
- **[Misc]** Add version to start of minified file
  [See commit →](https://github.com/javve/list.js/commit/79daff8da51aa047aae5d31e0af12cb30b395048)
- **[Misc]** Switch to GitHub pages for listjs.com
  [See commit →](https://github.com/javve/list.js/commit/1af94012de89fd6bcf8446c31305ad517507c44b)

### 2016-02-27: v1.2.0

It's been two years since the last update of List.js. That is absolutely not ok
and I'm very sorry that it has taken so long. I promise I'll do better in the future!

Anyways, this release introduces a bunch of bug fixes and improvements, but most
importantly: List.js now has support for data attributes PLUS all other attributes.
[See an example]() and [read the docs](https://www.listjs.com/docs#example-6).

Another noteworthy update is that I've left Component and moved back all utils
to the core lib. Instead I'm using Browserify as module handler.

I hope you'll like this update!

- **[Misc]** Move form Component to Browserify
  [See commit →](https://github.com/javve/list.js/commit/58695c93849b78787d9cf78cbf9be20b01cdcc8a)
- **[Misc]** Add tests to make sure List.js works with require.js
  [See commit →](https://github.com/javve/list.js/commit/360098a04b87e18afd1b09e293a01a8dc113a01e)
- **[Misc]** Update all dependencies to latest version
  [See commit →](https://github.com/javve/list.js/commit/881991cd204a19af5ed3c62c1239c1206fa51e6c)
- **[Breaking]** set sort order with List.js not sort function.
  [See commit →](https://github.com/javve/list.js/commit/81d1148489c99b8503e725805c2a6ce2bde47b11)
- **[Breaking]** set default page size to 10000 instead of 200 (because: page size is confusing for new users)
  [See commit →](https://github.com/javve/list.js/commit/618565b203b61c34b868a9cb86eea899e75ea4b6)
- **[Breaking]** Rename list.helpers to list.utils
  [See commit →](https://github.com/javve/list.js/commit/58695c93849b78787d9cf78cbf9be20b01cdcc8a)
- **[Feature]** Add support for data attributes and custom attributes ex. links and images. [See docs](https://listjs.com/).
  [See commit →](https://github.com/javve/list.js/commit/a8e083dc0f642e90b7a3f3cc11b12f9bb353d3a0)
- **[Feature]** Add toJSON method.
  [See commit →](https://github.com/javve/list.js/commit/570fd10e65fcf2e0d3d959ca42137625d9fd3b7c)
- **[Feature]** Add reIndex method that should be called if the html have been changed by something except List.js.
  [See commit →](https://github.com/javve/list.js/commit/825b2b55d339de2bb78eb41145d56a8b27d3d888)
- **[Feature]** Add option searchColumns to defined default columns to search in.
  [See commit →](https://github.com/javve/list.js/commit/b8b74f21f78c17f1c1842480084ffdb58edc26cd)
- **[Feature]** Support <tr> in options.item
  [See commit →](https://github.com/javve/list.js/commit/9700858168811b6559983d2cb792014213b817a6)
- **[Feature]** Make it possble to add event handlers on init `new List('listId', { searchComplete: function(list) {} })`.
  [See commit →](https://github.com/javve/list.js/commit/b8b74f21f78c17f1c1842480084ffdb58edc26cd)
- **[Bugfix]** Don't throw error if searching in a empty list.
  [See commit →](https://github.com/javve/list.js/commit/d805494732922024bb99090fb6521021189861e9)
- **[Bugfix]** Make it possible to use item.visible() on items not yet templated.
  [See commit →](https://github.com/javve/list.js/commit/8e898b0e55a7d47a77ee27f109602bdb63183fda)
- **[Bugfix]** Include reference to List when initializing plugins. Fix for require.js which don't have a global reference to List.
  [See commit →](https://github.com/javve/list.js/commit/40d3c5e5f98cf3bcb9624a5717d4435a0b6f49f6)
- **[Bugfix]** Fix index async. Fix #268
  [See commit →](https://github.com/javve/list.js/commit/27e2d6fdeee7090eb1342a108013db898fc29b96)
- **[Bugfix]** Fix add async
  [See commit →](https://github.com/javve/list.js/commit/237f926d3ea0036ffb8b255dd0da42387b6a653a)
- **[Bugfix]** Don't add empty item if empty list is initated with empty array.
  [See commit →](https://github.com/javve/list.js/commit/607a176c12b2219fb5204a789cd44ef367a0025f)
- **[Bugfix]** Make sort case insensitive by default for the automatic buttons
  [See commit →](https://github.com/javve/list.js/commit/44260b862f74dccd248d08ca1f7df2b422c8f439)
- **[Bugfix]** Clear all values from source item. Case: list.add({}) should not
  get same values as first item in list
  [See commit →](https://github.com/javve/list.js/commit/3a4733d52cff25ef99ee8a1326c0b54be81d64ca)

### 2014-02-03: 1.1.1

- **[Bugfix]** Update `javve/events` version which fixes critical bugs in Safari
  for PC and PhantomJS (which makes the command line tests work again).
- **[Bugfix]** Clear search when clicking in the HTML5 clear button.
- **[Misc]** Add History.md file for changelog instead of having it at Listjs.com.

### 2014-02-03: 1.1.0

- **[Breaking]** The sorting API is update so it looks like this
  `listObj.sort('name', { order: "asc "})` and `listObj.sort('name', { order: "desc "})`
  instead or `listObj.sort('name', { desc: true/false })`.
- **[Feature]** Added support for default sort function `new List('id', { sortFunction: function(itemA, itemB) { .. }})`
- **[Feature]** Adding `data-order="asc/desc"` to a sort button makes that button only sort `asc` or `desc`, ie no to
- **[Bugfix]** Fix `grunt watch` bug.
- **[Bugfix]** Remove sorting when searching and filtering.
- **[Bugfix]** Fix sorting and search when using pagiation plugin

### 2014-01-17: 1.0.2

- **[Bugfix]** Fix error that broke the lib in IE8.

### 2013-11-12: 1.0.0

- **[Feature]** Add more events and enable to add them on initialization.
- **[Feature]** Add support for Component.js, Bower, RequireJS and CommonJS
- **[Feature]** Make it possible to remove event handlers by `.off('event', handler)`
- **[Improvement]** Many new tests
- **[Improvement]** Paging plugin default classes and structure now correspons to <a href="https://twitter.github.com/bootstrap/components.html#pagination">Twitter Bootstraps pagination</a>.
- **[Improvement]** Make sorting case-insensitive (thanks @thomasklemm)
- **[Improvement]** Add item.\_values for direct access to a items values. Simplifies debugging. Note: Always use item.values() when interacting with the values.
- **[Bugfix]** `.add(items, callbak)` with `callback` set does no longer add an extra item.
- **[Bugfix]** `templater.set()` no longer is called twice in a `templater.get()` call.
- **[Bugfix]** Fix error when trying to sort `undefined,null,etc` values.
- **[Bugfix]** Fix error when trying to search `undefined,null,etc` values.
- **[Bugfix]** Fix issue #51, problems with filters/search + paging.
- **[Misc]** Almost completely rewritten codebase and started using <a href="https://github.com/component/component">Component</a>
- **[Misc]** Moved the website into another repo called <a href="https://github.com/javve/list-website">list-website</a>
- **[Misc]** Add documentation for searching in specific columns.
- **[Change]** `listObj.get('valueName', value)` does now always returns an array. Previously it return an object if only one item matched and null if no match was found.
- **[Change]** The default sort order is now `asc` instead of `desc`.
- **[Change]** Syntax for searching in specific columns are now `.search('val', [ 'columnName', 'columnName2' ])` instead of `.search('val', { columnName: true, columnName2: true })`.
- **[Change]** Move plugins into seperated repos: <a href="https://github.com/javve/list.pagination.js">github.com/javve/list.pagination.js</a> and <a href="https://github.com/javve/list.fuzzysearch.js">github.com/javve/list.fuzzysearch.js</a>
- **[Change]** Plugin initiation have changed. See <a href="/docs/plugins">getting started with plugins

### 2012-04-24: 0.2.1

- Fuzzy Search plugin, `.filter()` changes and bug fixes _[Read more »](http://jonnystromberg.com/listjs-0-2-1-release-notes/)_

### 2012-01-23: 0.2.0

- Lots of updates and interesting features. _[Read more »](http://jonnystromberg.com/listjs-0-2-0-plugins-paging/)_

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
- Added three new small helper functions `hasClass(element, class)`, ` addClass(element, class)`` and  `removeClass(element, class)`</li>

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
