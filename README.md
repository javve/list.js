# List.js
Do you want a 7 KB cross-browser native JavaScript that makes your plain HTML lists super flexible, searchable, sortable and filterable? **Yeah!**
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
        <span class="sort" rel="name">Sort by name</span>
        <span class="sort" rel="city">Sort by city</span>
        
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


# Documentation 

## Search, sort and list container elemenet
The secret behind the search field, the sort buttons and the list container element are the classes. 
By default does all inputs with class `search` becomes search fields for the list. 

    <input type="text" class="search" />

The sorting gets activated for all elements with class `sort` and then sorts the 
`valueName` corresponding the the `rel` value of the element.

    <span class="sort" rel="name">Sort names</span>

The element containing the list have to have the class `list` (or one that _you_ define)

    <ul class="list"></ul>
    # Can be a div, table, dl, or whatever fits your purpose

All of these classes can be defined by yourself when creating the list by setting the options
`searchClass`, `listClass` and `sortClass`.

## Create a list

### Constructor
*	List(id, options, values)

### Parameters
* **id** *(\*required)*  
 Id the element in which the list area should be initialized.
* **options**  
Some of the option parameters are required at some times
	* **valueNames** _(Array, default: null) (*only required if list already contains items before initialization)_   
	If the list contains items on initialization does this array
	have to contain the value names (class names) for the different values of 
	each list item.
	    
	        <ul class="list">
	            <li>
	                <span class="name">Jonny</span>
	                <span class="city">Sundsvall</span>
	            </li>
	        </ul>
	        
	        var valueNames = ['name', 'city'];
	    
	* **item** _(String, default: undefined)_  
	ID to item template element 
	
	* **listClass** _(String, default: "list")_  
	What is class of the list-container?
	
	* **searchClass** _(String, default: "search")_  
	What is class of the search field?
	
	* **sortClass** _(String, default: "sort")_  
	What is class of the sort buttons?
	
	* **indexAsync** _(Boolean, default: false)_  
	If there already are items in the list to which the 
	List.js-script is added, should the indexing be done 
	in a asynchronous way? Good for large lists (> 500 items).
	
	* **maxVisibleItemsCount** _(Int, default: 200)_
	Defines how many items that should be visible at the same time. This affects 
	performance.
* **values** _(Array of objects) (*optional)_  
Values to add to the list on initialization.


## List API
These methods are available for the List-object.

### Attributes
* **listContainer** _(Element)_  
The element node that contains the entire list area.
* **items** _(Array)_  
A Array of all Item-objects in the list.
* **list** _(Element)_  
The element containing all items.
* **templateEngines** _(Object)_  
Contains all template engines available.

### Functions
* **add(values)**  
Adds one or more items to the list. 
        
        listObj.add({ name: "Jonny", city: "Stockholm" });
        
        listObj.add([
            { name: "Gustaf", city: "Sundsvall" }
            , { name: "Jonas", city: "Berlin" }
        ]);

* **addAsync(values)**  
Adds one or more items the the list in a asynchronous way, works like regular `.add()`
but better if adding very many items (100+ or something).

* **remove(valueName, value)**  
Removes items from the list where the value named `valueName` has value `value`. 
Returns the count of items that where removed.

		itemsInList = [
			{ id: 1, name: "Jonny" }
			, { id: 2, name "Gustaf" }
		]
		listObj.remove("id", 1); -> return 1

* **get(valueName, value)**  
Returns values from the list where the value named `valueName` has value `value`.
	
			itemsInList = [
				{ id: 1, name: "Jonny" }
				, { id: 2, name "Gustaf" }
			]
			listObj.get("id", 2); -> return { id: 2, name "Gustaf" }

* **sort(valueName, sortFunction)**  
Sorts the list based in values in column named `valeuName`. The sortFunction 
parameter is used if you want to make you one sort function.  
Default sort function is found here [http://my.opera.com/GreyWyvern/blog/show.dml/1671288](http://my.opera.com/GreyWyvern/blog/show.dml/1671288)


* **search(searchString, columns)**  
Searches the list 	

* **filter(filterFunction)**  

        itemsInList = [
    	    { id: 1, name: "Jonny" }
    	    , { id: 2, name "Gustaf" }
    	    , { id: 3, name "Jonas" }
    	]
    	
    	listObj.filter(function(itemValues) {
    	   if (itemValues.id > 1) {
    	       return true;
    	   } else {
    	       return false;
    	   }
    	}); -> Only items with id > 1 are shown in list

* **size()**  
Returns the size of the list


## Item API 
These methods are available for all Items that are returned by
the list.
### Attributes

* **elm** _(Element)_  
The actual item DOM element

### Functions
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
Hides the item (removes the element from the list, and then when its shown its appended again, the element will thereby change position in the list, bug, but a good solution is yet to find)


## TemplateEngine API 
Only needed if you want to build you own template engine

### Attributes

None

### Functions
* **get(item, valueNames)** 
Get values from `item` corresponding to `valueNames` 

* **set(item, values)** 
Sets `values` to item

* **create(item)** 
Creates html element and adds to `item`

* **add(item)** 
Adds a `item`s html element to the list

* **remove(item)** 
Removes `item`

* **show(item)** 
Shows `item`

* **hide(item)** 
Hides the `item`

* **clear()**
Removes all items from the list


## Helper functions
Called by ListJsHelpers.functionName()

* **getByClass()**  
[http://www.dustindiaz.com/getelementsbyclass](http://www.dustindiaz.com/getelementsbyclass)

* **addEvent()**  
[http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/](http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/)
Updated in some ways, thought.

* **getAttribute()**  
[http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method](http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method)

* **isNodeList()**  
[http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript](http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript)

# Performance and benchmarking
Read about it at [The List.js Blog: Performance, wroooooom! Index, search and sort thousands of items](http://blog.listjs.com/post/12006163208/performance-wroooooom-index-search-and-sort)
and try it at the [performance test page](http://listjs.com/examples/performance-test.html).


# How to build the script
Type just *ant* in the console while in root folder.

# Known bugs/obscurities
* If items first are filtered and then sorted, all elements are shown again
* API for sorting asc/desc should be better

# Changelog
### 2011-10-20 Beta 0.1.1 release
* Added possibility to reverse sort the list

### 2011-10-18 Beta 0.1 release
* Examples at Listjs.com works in IE7,8,9 (IE6 is not tested, should work)
* More documentation
* Misc bug fixes

### 2011-10-15 Final alpha 0.3 release
* More documentation
* Only show 200 items at same time, huge speed increase
* Misc bug fixes

### 2011-08-08 Alpha 0.2 release
* Added asynchronous item adding
* Added asynchronous list indexing
* Improved (but incomplete) documentation
* Bugfixes and improved helper functions
* Show helper functions non-minified

### 2011-07-25 Alpha 0.1 release

# License (MIT)

Copyright (c) 2011 Jonny Strömberg http://jonnystromberg.se/

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