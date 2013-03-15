# List.js
Do you want a 3 KB (gzipped&minified) cross-browser native JavaScript that makes your plain HTML lists super flexible, searchable, sortable and filterable? **Yeah!**
Do you also want the possibility to add, edit and remove items by dead simple templating? **Hell yeah!**

# Super simple examples

More examples are found at [Listjs.com](http://listjs.com) and
[Listjs.com/examples.html](http://listjs.com/examples.html)

## Index existing list
HTML

    <div id="hacker-list">
        <ul class="list">
           <li>
               <h3 class="name">Jonny</h3>
               <p class="city">Stockholm</p>
           </li>
           <li>
               <h3 class="name">Jonas</h3>
               <p class="city">Berlin</p>
           </li>
        </ul>
    </div>

Javascript

    var options = {
        valueNames: [ 'name', 'city' ]
    };

    var hackerList = new List('hacker-list', options);

## Create list on initialization

### Version 1 (does not work with tables)
HTML

    <div id="hacker-list">
        <ul class="list"></ul>
    </div>

JavaScript

    var options = {
        item: '<li><h3 class="name"></h3><p class="city"></p></li>'
    };

    var values = [
        { name: 'Jonny', city:'Stockholm' }
        , { name: 'Jonas', city:'Berlin' }
    ];

    var hackerList = new List('hacker-list', options, values);


### Version 2 
HTML

    <div id="hacker-list">
        <ul class="list"></ul>
    </div>

    <div style="display:none;">
        <!-- A template element is needed when list is empty, TODO: needs a better solution -->
        <li id="hacker-item">
           <h3 class="name"></h3>
           <p class="city"></p>
        </li>
    </div>

JavaScript

    var options = {
        item: 'hacker-item'
    };

    var values = [
        { name: 'Jonny', city:'Stockholm' }
        , { name: 'Jonas', city:'Berlin' }
    ];

    var hackerList = new List('hacker-list', options, values);



## Index existing list and then add
HTML

    <div id="hacker-list">
        <ul class="list">
           <li>
               <h3 class="name">Jonny</h3>
               <p class="city">Stockholm</p>
           </li>
        </ul>
    </div>

JavaScript

    var options = {
        valueNames: ['name', 'city']
    };

    var hackerList = new List('hacker-list', options);

    hackerList.add( { name: 'Jonas', city:'Berlin' } );

## Add automagic search and sort inputs and buttons
HTML

    <div id="hacker-list">

        <input class="search" />
        <span class="sort" data-sort="name">Sort by name</span>
        <span class="sort" data-sort="city">Sort by city</span>

        <ul class="list">
           <li>
               <h3 class="name">Jonny</h3>
               <p class="city">Stockholm</p>
           </li>
           <li>
               <h3 class="name">Jonas</h3>
               <p class="city">Berlin</p>
           </li>
        </ul>
    </div>

Javascript (nothing special)

    var options = {
        valueNames: [ 'name', 'city' ]
    };

    var hackerList = new List('hacker-list', options);


# Plugins

List.js offers the possiblity to use and add plugins that are integrated in the list objects 
and are initiated at the same time as the lists. [Read more here »](http://jonnystromberg.com/listjs-plugins-guide/)

## List of plugins

* **[Paging plugin](http://jonnystromberg.com/listjs-paging-plugin/)** - A plugin for easily adding 
paging to List.js
* **[Fuzzy search plugin](http://jonnystromberg.com/listjs-fuzzy-search-plugin/)** - A plugin for fuzzy search matching 

As you can see, there are currently only two plugins. But I would very much like to add your plugin
to this list if you just email me.

# Documentation

## Search, sort and list container element
The secret behind the search field, the sort buttons, and the list container element are the classes.
By default, all inputs with class `search` become search fields for the list.

    <input type="text" class="search" />

The sorting gets activated for all elements with class `sort` and then sorts the
`valueName` corresponding to the the `data-sort` value of the element.

    <span class="sort" data-sort="name">Sort names</span>

The element containing the list has to have the class `list` (or one that _you_ define)

    <ul class="list"></ul>
    # Can be a div, table, dl, or whatever fits your purpose

All of these classes can be defined by yourself when creating the list by setting the options
`searchClass`, `listClass` and `sortClass`.

## Create a list

### Constructor
*	List(id, options, values)

### Parameters
* **id** or **element** *(\*required)*
 Id the element in which the list area should be initialized. OR the actual element itself.
* **options**
Some of the option parameters are required at some times
	* **valueNames** _(Array, default: null) (*only required if the list already contains items before initialization)_  
	If the list contains items on initialization, then this array
	has to contain the value names (class names) for the different values of
	each list item.

	        <ul class="list">
	            <li>
	                <span class="name">Jonny</span>
	                <span class="city">Sundsvall</span>
	            </li>
	        </ul>

	        var valueNames = ['name', 'city'];

	* **item** _(String, default: undefined)_  
	ID to item template element or a string of HTML (**notice**: does not work with `<tr>`)

	        var options = {
	            item: "<li><span class='name'></span><span class='city'></span></li>"
	        }

	* **listClass** _(String, default: "list")_  
	What is the class of the list-container?

	* **searchClass** _(String, default: "search")_  
	What is the class of the search field?

	* **sortClass** _(String, default: "sort")_  
	What is the class of the sort buttons?

	* **indexAsync** _(Boolean, default: false)_  
	If there are already items in the list to which the
	List.js-script is added, then should the indexing be done
	in a asynchronous way? Good for large lists (> 500 items).

	* **page** _(Int, default: 200)_ (maxVisibleItemsCount previously)  
	Defines how many items that should be visible at the same time. This affects
	performance.

	* **i**  _(Int, default: 1)_  

	Which items should be shown as the first one.

	* **plugins** _(Array, default: undefined)_  
	[Read more about plugins here](http://jonnystromberg.com/listjs-plugins-guide/)

    * **events** _(Object, default: undefined)_  

            var options = {
                updated: function(list) {
                    console.log('There are now ' + list.visibleItems.length + ' visible items');
                },
                sortComplete: function(list) {
                    console.log('There are now ' + list.matchingItems.length + ' matching items');
                }
            };

        Available events (all have `list` as parameter):

        * updated
        * searchStart
        * searchComplete
        * sortStart
        * sortComplete
        * filterStart
        * filterComplete

* **values** _(Array of objects) (*optional)_
Values to add to the list on initialization.


# List API
These methods are available for the List-object.

### Properties
* **listContainer** _(Element)_  
The element node that contains the entire list area.

* **list** _(Element)_  
The element containing all items.

* **items** _(Array)_  
An Array of all Item-objects in the list.

* **visibleItems** _(Array)_  
The currently visible items in the list

* **matchingItems** _(Array)_  
The items matching the currently active filter and search.

* **searched** _(Boolean)_  
Returns true if the list is searched.

* **filtered** _(Boolean)_  
Returns true if there is an active filter.

* **list** _(Element)_  
The element containing all items.

* **templateEngines** _(Object)_  
Contains all template engines available.

* **plugins** _(Object)_  
The currently available plugins.

* **events** _(Object with Arrays)_  
The currently attached event callbacks.

### Methods
* **add(values, callback)**  
Adds one or more items to the list.

        listObj.add({ name: "Jonny", city: "Stockholm" });

        listObj.add([
            { name: "Gustaf", city: "Sundsvall" }
            , { name: "Jonas", city: "Berlin" }
        ]);

    If `callback` is set then items are added to the list in a asynchronous way, and the
    callback is called when all items are added. This is especially useful
    when adding very many items (200+ or something), or if you just like the
    asynchronous coding style.

        listObj.add(arrayWithManyManyItems, function(items) {
            console.log('All ' + items.length + ' were added!');
        });

* **remove(valueName, value)**  
Removes items from the list where the value named `valueName` has value `value`.
Returns the number of items that where removed.

		itemsInList = [
			{ id: 1, name: "Jonny" }
			, { id: 2, name "Gustaf" }
		];
		listObj.remove("id", 1); -> return 1

* **get(valueName, value)**  
Returns values from the list where the value named `valueName` has value `value`.

			itemsInList = [
				{ id: 1, name: "Jonny" }
				, { id: 2, name "Gustaf" }
			];
			listObj.get("id", 2); -> return [ { id: 2, name "Gustaf" } ]

* **sort(valueName, options)**  
Sorts the list based on values the in the column named `valueName`. The options
parameter can contain two properties `options.sortFunction` and `options.asc`.
`options.sortFunction` is used if you want to make your own sort function.
The default sort function is found here [http://my.opera.com/GreyWyvern/blog/show.dml/1671288](http://my.opera.com/GreyWyvern/blog/show.dml/1671288)
`options.asc = true` means that you want to sort the list in ascending order. Set
`false` for descending.

        listObj.sort('name', { asc: true }); -> Sorts the list in abc-order based on names
        listObj.sort('name', { asc: false }); -> Sorts the list in zxy-order based on names

* **search(searchString, columns)**    
Searches the list

        itemsInList = [
            { id: 1, name: "Jonny" }
            , { id: 2, name "Gustaf" }
            , { id: 3, name "Jonas" }
        ];

        listObj.search('Jonny'); -> Only item with name Jonny is shown (also returns this item)

        listObj.search(); -> Show all items in list

        listObj.search('Jonny', [ 'name' ]); -> Find element
        listObj.search('Jonny', [ 'id' ]); -> Find no element

* **clear()**  
Removes all items from the list

* **filter(filterFunction)**

        itemsInList = [
    	    { id: 1, name: "Jonny" }
    	    , { id: 2, name "Gustaf" }
    	    , { id: 3, name "Jonas" }
    	];

    	listObj.filter(function(item) {
    	   if (item.values().id > 1) {
    	       return true;
    	   } else {
    	       return false;
    	   }
    	}); -> Only items with id > 1 are shown in list

    	listObjs.filter(); -> Remove all filters

* **size()**  
Returns the size of the list.

* **show(i, page)**  
Shows `page` number of items from `i`. Use for paging etc.

        itemsInList = [
    	    { id: 1, name: "Jonny" }
    	    , { id: 2, name "Gustaf" }
    	    , { id: 3, name "Jonas" }
    	    , { id: 4, name "Egon" }
    	    , { id: 5, name "Frank" }
    	    , { id: 6, name "Ester" }
    	];
    	
    	listObj.show(4, 3); -> Display item 4,5,6 
    	
    	
* **update()**  
Updates the current state of the list. Meaning that if you for instance 
hides some items with the `itemObj.hide()` method then you have to call `listObj.update()` 
if you want the paging to update.

* **on(event, callback)**  
Execute `callback` when `event` is triggered.

        list.on('updated', function(list) {
            console.log('There are now ' + list.visibleItems.length + ' visible items');
        });

    Available events:

    * updated
    * searchStart
    * searchComplete
    * sortStart
    * sortComplete
    * filterStart
    * filterComplete

# Item API
These methods are available for all Items that are returned by
the list.

### Properties

* **elm** _(Element)_
The actual item DOM element

### Methods
* **values(newValues)**
	* newValues _optional_
	If variable newValues are present the new values replaces the current item values
	and updates the list.
	If newValues are not present, the function returns the current values.

	        item.values() -> { name: "Jonny", age: 24, city: "Umeå" }
	        item.values({
	            age: 25,
	            city: "Stockholm"
	        });
	        item.values() -> { name: "Jonny", age: 25, city: "Stockholm" }

* **show()**  
Shows the item

* **hide()**  
Hides the item (removes the element from the list, and then when its shown it's appended again. The element will thereby change position in the list. A bug, but a good solution is yet to be found.)

* **matching()**  
Returns boolean. True if the item matches the current filter and search. Visible items 
always matches, but matching items are not always visible.

* **visible()**  
Returns boolean. True if the item is visible. Visible items 
always matches, but matching items are not always visible.


# Plugins (paging)
Read more about plugins in [this blog post](http://jonnystromberg.com/listjs-plugins-guide/) and find out [how to use the paging plugin here](http://jonnystromberg.com/listjs-paging-plugin/).


# Performance and benchmarking
Read about it at [The List.js Blog: Performance, wroooooom! Index, search and sort thousands of items](http://blog.listjs.com/post/12006163208/performance-wroooooom-index-search-and-sort)
and try it at the [performance test page](http://listjs.com/examples/performance-test.html).


# Contributing and compiling
List.js is built using the [Component package manager](https://github.com/component/component)

## Steps to compile the script
- [Install Component](https://github.com/component/component#installation)
- Got to the script root
- Type `make components` to download dependencies
- `make standalone` to compile List.js into `/build`

# Changelog

Read it at: **[http://listjs.com/changelog.html](http://listjs.com/changelog.html)**


# Contributor
* [javve](https://github.com/javve) / [Jonny Strömberg](http://jonnystromberg.com)
* [lusentis](https://github.com/lusentis) / [Simone Lusenti](http://www.plasticpanda.com)
* [dancrew32](https://github.com/dancrew32) / [Dan Masquelier](http://danmasq.com)
* [himynameisjonas](https://github.com/himynameisjonas) / [Jonas Forsberg](http://jonasforsberg.se)
* [LuukvE](https://github.com/LuukvE) [Luuk van Egeraat](http://luukvanegeraat.com/)
* [endorama](https://github.com/endorama) / Edoardo Tenani
* [sprynmr](https://github.com/sprynmr) / Bob Spryn
* [francescolaffi](https://github.com/francescolaffi)
* [ryantanner](https://github.com/ryantanner)
* [idlefella](https://github.com/idlefella)
* [julienbechade](https://github.com/julienbechade) / [Julien Béchade/](http://julienbechade.com/)
* [matthewheston](https://github.com/matthewheston)
* [gvido](https://github.com/gvido) / Gvido Glazers
* [karlwestin](https://github.com/karlwestin) / [Karl Westin](http://karlwestin.com)
* [joakin](https://github.com/joakin) / [Joaquin](http://chimeces.com/)
* [dancrew32](https://github.com/dancrew32) / [Dan Masquelier](http://danmasq.com/)
* [jkeyes](https://github.com/jkeyes) / [John Keyes](http://keyes.ie/)

# License (MIT)

Copyright (c) 2012 Jonny Strömberg <[jonny.stromberg@gmail.com](jonny.stromberg@gmail.com)>
[http://jonnystromberg.com](http://jonnystromberg.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.