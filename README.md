# Super simple examples


# Documentation 

## Create a list

### Constructor
#### List(id, options, values)

### Parameters
#### id (*required)
Id the element in which the list area should be initialized.
#### options
Some of the option parameters are required at some times
##### templates (Object)
###### valueNames (Array, default: null) 
Array of strings (needed if )
###### list (String, default: undefined)
ID to 

##### indexAsync (Boolean, default: false)
If there already are items in the list to which the 
List.js-script is added, should the indexing be done 
in a asynchronous way? Good for large lists (> 500 items).

#### values (Array of objects) (*optional)
Values to add to the list on initialization.

### Examples

#### Index existing list
#### Create 

## List API
These methods are available for the List-object.

### Attributes
#### listContainer (Element)
The element node that contains the entire list area.
#### items (Array)
A Array of all Item-objects in the list.
#### list (Element)
The element containing all items.
#### templateEngines (Object)
Contains all template engines available.

### Functions
#### add(values, options)
Adds one or more items to the list. 
#### addAsync(values, options)
Adds one or more items the the list in a asynchronous way.
#### remove(valueName, value, options)
Removes items from the list where the value named "valueName" has value "value". 
Returns the count of items that where removed.
##### Example 
itemsInList = [
	{ id: 1, name: "Jonny" }
	, { id: 2, name "Gustaf" }
]
listObj.remove("id", 1); -> return 1

#### get(valueName, value)
Returns values from the list where the value named "valueName" has value "value".
##### Example 
itemsInList = [
	{ id: 1, name: "Jonny" }
	, { id: 2, name "Gustaf" }
]
listObj.get("id", 2); -> return { id: 2, name "Gustaf" }

#### sort(valueOrEvent, sortFunction)
Sorts the list based in values in column named "valueOrEvent". The sortFunction 
parameter is used if you want to make you one sort function.

#### search(searchStringOrEvent, columns)
Searches the list 

#### filter(filterFunction)
#### size()
Returns the size of the list


## Item API 
These methods are available for all Items that are returned by
the list.
### Attributes
None.
### Functions
#### values(newValues)
#### show()
#### hide()


## TemplateEngine API (only needed if you want to build you own template engine)
### Attributes
None in the standard engine. 
But there may be included in other engines.

### Functions
#### get(item, valueNames)
#### set(item, values)
#### create(item)
#### add(item)
#### remove(item)
#### show(item)
#### hide(item)

## Helper functions
Called by ListJsHelpers.functionName()

### getByClass()
### addEvent()
### getAttribute()

# Changelog

2011-07-25 Alpha 0.1 release