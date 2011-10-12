# List.js
A 5kb small script written in native JavaScript that blabla, lists

# Super simple examples


# Documentation 

## Create a list

### Constructor
*	List(id, options, values)

### Parameters
* **id** *(\*required)*  
 Id the element in which the list area should be initialized.
* **options**  
Some of the option parameters are required at some times
	* **templates** _(Object)_
		* **valueNames** _(Array, default: null)_   
		Array of strings (needed if )
		* **list** _(String, default: undefined)_  
		ID to 
		* **item** _(String, default: undefined)_  
		ID to 
	* **indexAsync** _(Boolean, default: false)_  
	If there already are items in the list to which the 
	List.js-script is added, should the indexing be done 
	in a asynchronous way? Good for large lists (> 500 items).
* **values** _(Array of objects) (*optional)_  
Values to add to the list on initialization.

### Examples

#### Index existing list
#### Create 

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
* **add(values, options)**  
Adds one or more items to the list. 
	* values
	* options
* **addAsync(values, options)**  
Adds one or more items the the list in a asynchronous way.
	* values
	* options
* **remove(valueName, value, options)**  
Removes items from the list where the value named "valueName" has value "value". 
Returns the count of items that where removed.

		itemsInList = [
			{ id: 1, name: "Jonny" }
			, { id: 2, name "Gustaf" }
		]
		listObj.remove("id", 1); -> return 1

* **get(valueName, value)**  
Returns values from the list where the value named "valueName" has value "value".
	* valueName
	* value  
	
			itemsInList = [
				{ id: 1, name: "Jonny" }
				, { id: 2, name "Gustaf" }
			]
			listObj.get("id", 2); -> return { id: 2, name "Gustaf" }

* **sort(valueOrEvent, sortFunction)**  
Sorts the list based in values in column named "valueOrEvent". The sortFunction 
parameter is used if you want to make you one sort function.
	* valueOrEvent
	* sortFunction

* **search(searchStringOrEvent, columns)**  
Searches the list 	

* **filter(filterFunction)**  
	* filterFunction
* **size()**  
Returns the size of the list


## Item API 
These methods are available for all Items that are returned by
the list.
### Attributes
None.
### Functions
* **values(newValues)**
	* newValues
* **show()**
Shows the item (add style.display = "block", not perfect, I know, please help)
* **hide()**
Hides the item (add style.display = "none")


## TemplateEngine API 
Only needed if you want to build you own template engine

### Attributes
None in the standard engine. 
But there may be included in other engines.

### Functions
* **get(item, valueNames)** 

* **set(item, values)** 

* **create(item)** 

* **add(item)** 

* **remove(item)** 

* **show(item)** 

* **hide(item)** 


## Helper functions
Called by ListJsHelpers.functionName()

* **getByClass()** 

* **addEvent()** 

* **getAttribute()** 

## How to build the script
Type just *ant* in the console while in root folder.

# Changelog
### 2011-08-08 Alpha 0.2 release
* Added asynchronous item adding
* Added asynchronous list indexing
* Improved (but incomplete) documentation
* Bugfixes and improved helper functions
* Show helper functions non-minified

### 2011-07-25 Alpha 0.1 release