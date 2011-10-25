/*
ListJS Beta 0.1
By Jonny Strömberg (www.jonnystromberg.se, www.listjs.com)

OBS. The API is not frozen. It MAY change!

License (MIT)

Copyright (c) 2011 Jonny Strömberg http://jonnystromberg.se/

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.

*/
(function( window, undefined ) {
"use strict";
var document = window.document,
	navigator = window.navigator,
	location = window.location,
	ListJsHelpers;

function List(id, options, values) {
    var self = this, 
		templater,
		init,
		initialItems,
		sorter,
		Item,
		Templater;

    this.listContainer = document.getElementById(id);
    this.items = [];
    this.list = null;
    this.templateEngines = {};    
    this.maxVisibleItemsCount = options.maxVisibleItemsCount || 200;

    init = function(values, options) {
	
		options.list = options.list || id;
		options.listClass = options.listClass || 'list';
		options.searchClass = options.searchClass || 'search';
		options.sortClass = options.sortClass || 'sort';
		
        templater = new Templater(self, options);
        self.list = ListJsHelpers.getByClass(options.listClass, self.listContainer, true);
        ListJsHelpers.addEvent(ListJsHelpers.getByClass(options.searchClass, self.listContainer), 'keyup', self.search);
        ListJsHelpers.addEvent(ListJsHelpers.getByClass(options.sortClass, self.listContainer), 'click', self.sort);
        if (options.valueNames) {
            var itemsToIndex = initialItems.get(),
                valueNames = options.valueNames;
            if (options.indexAsync) {
                initialItems.indexAsync(itemsToIndex, valueNames);
            } else {
                initialItems.index(itemsToIndex, valueNames);
            }
        }
        if (values !== undefined) {
            self.add(values);
        }
    };
    
	initialItems = {
        get: function() {
            // return ListJsHelpers.getByClass('item', self.list);
			var nodes = self.list.childNodes,
				items = [];
			for (var i = 0, il = nodes.length; i < il; i++) {
				// Only textnodes have a data attribute
				if (nodes[i].data === undefined) {
					items.push(nodes[i]);
				}
			}
			return items;
        },
        index: function(itemElements, valueNames) {
            for (var i = 0, il = itemElements.length; i < il; i++) {
                self.items.push(new Item(valueNames, itemElements[i]));
            }
        },
        indexAsync: function(itemElements, valueNames) {
            var itemsToIndex = itemElements.splice(0, 100); // TODO: If < 100 items, what happens in IE etc?
            this.index(itemsToIndex, valueNames);
            if (itemElements.length > 0) {
                setTimeout(function() {
                    initialItems.indexAsync(itemElements, valueNames);
                }, 10);
            }/* else {
                // TODO: Add indexed callback
            }*/
        }
    };

    /* 
    * Add object to list
    */
    this.add = function(values, options) {
        var added = [], 
            notCreate = false;
        if (values[0] === undefined){
            values = [values];
        }
        for (var i = 0, il = values.length; i < il; i++) {
            var item = null;
            if (values[i] instanceof Item) {
                item = values[i];
                item.reload();
            } else {
                notCreate = (self.items.length > self.maxVisibleItemsCount) ? true : false;
                item = new Item(values[i], undefined, notCreate);
            }
            if (!notCreate) {
                templater.add(item, options);
            }
            self.items.push(item);
            added.push(item);
        }
        return added;
    };
    
    var dateObj2 = null;
    /*
    * Adds items asyncrounous to the list, good for adding hugh about of 
    * data. Defaults to add 100 items a time
    */
    this.addAsync = function(values, options) {
        var count = options ? options.count || 100 : 100, 
			valuesToAdd = values.splice(0, count);
        self.add(valuesToAdd, options);
        if (values.length > 0) {
            setTimeout(function() {
                self.addAsync(values, options);
            }, 10);
        }/* else {
            // TODO: Add added callback
        }*/
    };

    /* Removes object from list. 
    * Loops through the list and removes objects where
    * property "valuename" === value
    */
    this.remove = function(valueName, value, options) {
        var found = 0;
        for (var i = 0, il = self.items.length; i < il; i++) {
            if (self.items[i].values()[valueName] == value) {
                templater.remove(self.items[i], options);
                self.items.splice(i,1);
                il--;
                found++;
            }
        }
        return found;
    };

    /* Gets the objects in the list which 
    * property "valueName" === value
    */
    this.get = function(valueName, value) {
        var matchedItems = [];
        for (var i = 0, il = self.items.length; i < il; i++) {
            var item = self.items[i];
            if (item.values()[valueName] == value) {
                matchedItems.push(item);
            }
        }
        if (matchedItems.length == 0) {
            return null; 
        } else if (matchedItems.length == 1) {
            return matchedItems[0];
        } else {
            return matchedItems;
        }
    };

    /* Sorts the list.
    * @valueOrEvent Either a JavaScript event object or a valueName
    * @sortFunction (optional) Define if natural sorting does not fullfill your needs
    * 
    * TODO: Add Desc || Asc
    */
    this.sort = function(valueName, sortFunction) {            
        var length = self.items.length,
            value = null,
			target = valueName.target || valueName.srcElement, /* IE have srcElement */ 
			sorting = '',
			asc = false;
        
		if (target === undefined) {
            value = valueName;
        } else {	
            value = ListJsHelpers.getAttribute(target, 'rel');
			sorting = ListJsHelpers.getAttribute(target, 'sorting');
			
			if (sorting == 'asc') {
				target.setAttribute('sorting', 'desc');
				asc = false;
			} else {
				target.setAttribute('sorting', 'asc');
				asc = true;
			}
        }
		
        if (sortFunction) {
            sortFunction = sortFunction;
        } else {
            sortFunction = function(a, b) {
                return sorter.alphanum(a.values()[value], b.values()[value], asc);
            };
        }
        self.items.sort(sortFunction);
        templater.clear();
        for (var i = 0, il = self.items.length; i < il; i++) {
            if (self.maxVisibleItemsCount > i) {
                templater.add(self.items[i]);
            }
        }
    };

    /*
    * The sort function. From http://my.opera.com/GreyWyvern/blog/show.dml/1671288
    */
    sorter = {
        alphanum: function(a,b,asc) {
            if (a === undefined) {
                a = "";
            }
            if (b === undefined) {
                b = "";
            }
            a = a.toString().replace(/&(lt|gt);/g, function (strMatch, p1){
                return (p1 == "lt")? "<" : ">";
            });
            a = a.replace(/<\/?[^>]+(>|$)/g, "");

            b = b.toString().replace(/&(lt|gt);/g, function (strMatch, p1){
                return (p1 == "lt")? "<" : ">";
            });
            b = b.replace(/<\/?[^>]+(>|$)/g, "");
            var aa = this.chunkify(a);
            var bb = this.chunkify(b);

            for (var x = 0; aa[x] && bb[x]; x++) {
                if (aa[x] !== bb[x]) {
                    var c = Number(aa[x]), d = Number(bb[x]);
                    if (asc) {
						if (c == aa[x] && d == bb[x]) {
	                        return c - d;
	                    } else { 
	                        return (aa[x] > bb[x]) ? 1 : -1;
	                    }
					} else {
						if (c == aa[x] && d == bb[x]) {
	                        return d-c;//c - d;
	                    } else { 
	                        return (aa[x] > bb[x]) ? -1 : 1; //(aa[x] > bb[x]) ? 1 : -1;
	                    }
					}
                }
            }
            return aa.length - bb.length;
        },
        chunkify: function(t) {
            var tz = [], x = 0, y = -1, n = 0, i, j;

            while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                var m = (i == 45 || i == 46 || (i >=48 && i <= 57));
                if (m !== n) {
                    tz[++y] = "";
                    n = m;
                }
                tz[y] += j;
            }
            return tz;
        }
    }; 

    /*
    * Searches the list after values with content "searchStringOrEvent".
    * The columns parameter defines if all values should be included in the search,
    * defaults to undefined which means "all". 
    */
    this.search = function(searchString, columns) {
        var foundItems = [],
			target = searchString.target || searchString.srcElement; /* IE have srcElement */
        if (target !== undefined) {
            searchString = target.value.toLowerCase();
        } else {
            searchString = searchString.toLowerCase();
        }
        var useAllColumns = false;
        if (columns === undefined) {
            useAllColumns = true;
        }
        templater.clear();
        if (searchString === "") {
            for (var i = 0, il = self.items.length; ((i < il) && (i < self.maxVisibleItemsCount)); i++) {
                self.items[i].show();
            }
        } else {
            for (var k = 0, kl = self.items.length; k < kl; k++) {
                var found = false,
                    item = self.items[k];
                if (useAllColumns) {
                    columns = item.values();
                }
                for(var j in columns) {
					if(columns.hasOwnProperty(j)) {
						var text = columns[j].toString().toLowerCase();
						if ((searchString !== "") && (text.search(searchString) > -1)) {
							found = true;
						}
					}
                }
                if (found) {
                    foundItems.push(item);
                }
                if (found && (self.maxVisibleItemsCount > foundItems.length)) {
                    item.show();
                }
            }
        }
        return foundItems;
    };

    /*
    * Filters the list. If filterFunction() returns False hides the Item.
    * if filterFunction == false are the filter removed
    */
    this.filter = function(filterFunction) {
        var visibleItems = [];
        for (var i = 0, il = self.items.length; i < il; i++) {
            var item = self.items[i];
            if (filterFunction === false || filterFunction === undefined) {
                item.show();
                visibleItems.push(item);
            } else {
                if (filterFunction(item.values())) {
                    visibleItems.push(item);
                    item.show();
                } else {
                    item.hide();
                }
            }
        }
        return visibleItems;
    };
    
    /*
    * Get size of the list
    */
    this.size = function() {
        return self.items.length;
    };

    Item = function(initValues, element, notCreate) {
        var item = this,
            values = {};

        var init = function(initValues, element, notCreate) {
            if (element === undefined) {
                if (notCreate) {
                    item.values(initValues, notCreate);
                } else {
                    //templater.create(item);
                    item.values(initValues);
                    //templater.add(item);
                }
            } else {
                item.elm = element;
                var values = templater.get(item, initValues);
                item.values(values);
            }
        };
        this.values = function(newValues, notCreate) {
            if (newValues !== undefined) {
				for(var name in newValues) {
					if (newValues.hasOwnProperty(name)) {
						values[name] = newValues[name];
					}
				}
                //values = newValues;
                if (notCreate !== true) {
                    templater.set(item, item.values());
                }
            } else {
                return values;
            }
        };
        this.show = function() {
            templater.show(item);
        };
        this.hide = function() {
            templater.hide(item);
        };
        init(initValues, element, notCreate);
    };

    /* Templater with different kinds of template engines.
    * All engines have these methods
    * - reload(item)
    * - remove(item)
    */
    Templater = function(list, settings) {
        if (settings.engine === undefined) {
            settings.engine = "standard";
        } else {
            settings.engine = settings.engine.toLowerCase();
        }
        return new self.constructor.prototype.templateEngines[settings.engine](list, settings);
    };

    init(values, options);
}

List.prototype.templateEngines = {};


List.prototype.templateEngines.standard = function(list, settings) {
    var listSource = ListJsHelpers.getByClass(settings.listClass, document.getElementById(settings.list))[0],
		itemSource = document.getElementById(settings.item),
		templater = this,
		ensure = {
			tryItemSourceExists: function() {
				if (itemSource === null) {
					var nodes = listSource.childNodes,
					items = [];
					for (var i = 0, il = nodes.length; i < il; i++) {
						// Only textnodes have a data attribute
						if (nodes[i].data === undefined) {
							itemSource = nodes[i];
							break;
						}
					}
				}
			},
			created: function(item) {
				if (item.elm === undefined) {
					templater.create(item);
				}
			},
			added: function(item) {
				if (item.elm.parentNode === null) {
					templater.add(item);
				}
			}
		};

    /* Get values from element */
    this.get = function(item, valueNames) {
		ensure.tryItemSourceExists();
        ensure.created(item);
        var values = {};
        for(var i = 0, il = valueNames.length; i < il; i++) {
            values[valueNames[i]] = ListJsHelpers.getByClass(valueNames[i], item.elm)[0].innerHTML;
        }
        return values;
    };
    
    /* Sets values at element */
    this.set = function(item, values) {
        ensure.created(item);
        for(var v in values) {
			if (values.hasOwnProperty(v)) {
				// TODO speed up if possible
				var hej = ListJsHelpers.getByClass(v, item.elm, true);
				if (hej) {
					hej.innerHTML = values[v];
				}
			}
        }
    };
    
    this.create = function(item) {
        if (item.elm !== undefined) {
            return;
        }
        /* If item source does not exists, use the first item in list as 
        source for new items */
        ensure.tryItemSourceExists();
        var newItem = itemSource.cloneNode(true);
        newItem.id = "";
        item.elm = newItem; 
        templater.set(item, item.values());
    };
    this.add = function(item) {
        ensure.created(item);
        listSource.appendChild(item.elm);
    };
    this.remove = function(item) {
        listSource.removeChild(item.elm);
    };
    this.show = function(item) {
        ensure.created(item);
        ensure.added(item);
		listSource.appendChild(item.elm);
    };
    this.hide = function(item) {
        ensure.created(item);
		listSource.removeChild(item.elm);
    };
    this.clear = function() {
		/* .innerHTML = ''; fucks up IE */
        if (listSource.hasChildNodes()) {
		    while (listSource.childNodes.length >= 1)
		    {
		        listSource.removeChild(listSource.firstChild);       
		    } 
		}
    };
};


/*
* These helper functions are not written by List.js author Jonny (they may have been 
* adjusted, thought).
*/
ListJsHelpers = {
    /*
    * Cross browser getElementsByClassName, which uses native
    * if it exists. Modified version of Dustin Diaz function:
    * http://www.dustindiaz.com/getelementsbyclass 
    */
    getByClass: (function() {
        if (document.getElementsByClassName) {
            return function(searchClass,node,single) {
                if (single) {
                    return node.getElementsByClassName(searchClass)[0];
                } else {
                    return node.getElementsByClassName(searchClass);
                }
            };
        } else {
            return function(searchClass,node,single) {
                var classElements = [],
					tag = '*';
                if (node == null) {
					node = document;
				}
                var els = node.getElementsByTagName(tag);
                var elsLen = els.length;
                var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
                for (var i = 0, j = 0; i < elsLen; i++) {
                    if ( pattern.test(els[i].className) ) {
                        if (single) {
                            return els[i];
                        } else {
                            classElements[j] = els[i];
                            j++;
                        }
                    }
                }
                return classElements;
            };
        }
    })(),
    /* (elm, 'event' callback) Source: http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/ */
    addEvent: (function( window, document ) {  
        if ( document.addEventListener ) {  
            return function( elem, type, cb ) {
                if ((elem && !(elem instanceof Array) && !elem.length && !ListJsHelpers.isNodeList(elem) && (elem.length !== 0)) || elem === window ) {  
                    elem.addEventListener(type, cb, false );  
                } else if ( elem && elem[0] !== undefined ) {  
                    var len = elem.length;
                    for ( var i = 0; i < len; i++ ) {
                        ListJsHelpers.addEvent(elem[i], type, cb);
                    }  
                }  
            };  
        }  
        else if ( document.attachEvent ) {  
            return function ( elem, type, cb ) {  
                if ((elem && !(elem instanceof Array) && !elem.length && !ListJsHelpers.isNodeList(elem) && (elem.length !== 0)) || elem === window ) {  
                    elem.attachEvent( 'on' + type, function() { return cb.call(elem, window.event); } );  
                } else if ( elem && elem[0] !== undefined ) { 
                    var len = elem.length;
                    for ( var i = 0; i < len; i++ ) {
                        ListJsHelpers.addEvent( elem[i], type, cb );
                    }  
                }  
            };  
        }  
    })(this, document),
    /* (elm, attribute) Source: http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method */
    getAttribute: function(ele, attr) {
        var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
        if( !result ) {
            var attrs = ele.attributes;
            var length = attrs.length;
			for(var i = 0; i < length; i++) {
				if (attr[i] !== undefined) {
					if(attr[i].nodeName === attr) {
						result = attr[i].nodeValue;
					}
                }
            }
        }
        return result;
    },
	/* http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript */
	isNodeList: function(nodes) {
		var result = Object.prototype.toString.call(nodes);
		if (typeof nodes === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(result) && (nodes.length == 0 || (typeof node === "object" && nodes[0].nodeType > 0))) {
			return true;
		}
		return false;
	}
};

window.List = List;
window.ListJsHelpers = ListJsHelpers;
})(window);