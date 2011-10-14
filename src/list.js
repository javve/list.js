/*
ListJS Alpha 0.1
By Jonny Strömberg (www.poseinteractive.se)

Licence: Dunno yet. Everything should be allowed except for redistributing 
the script under an other name. MIT or something.

OBS. The API is not frozen. It WILL change! Wait for beta.

*/

function List(id, templates, values) {
    var self = this
        , templater = null;
    this.listContainer = document.getElementById(id);
    this.items = [];
    this.list = null;
    this.templateEngines = {};    
    this.maxVisibleItemsCount = 200;

    var init = function(values, templates) {
        if (typeof templates.list === 'undefined') {
            templates.list = id;
        }
        templater = new Templater(templates);
        self.list = ListJsHelpers.getByClass('list', self.listContainer, true);
        ListJsHelpers.addEvent(ListJsHelpers.getByClass('search', self.listContainer), 'keyup', self.search);
        ListJsHelpers.addEvent(ListJsHelpers.getByClass('sort', self.listContainer), 'click', self.sort);
        if (templates.valueNames) {
            var itemsToIndex = initialItems.get(),
                valueNames = templates.valueNames;
            if (templates.indexAsync) {
                initialItems.indexAsync(itemsToIndex, valueNames);
            } else {
                initialItems.index(itemsToIndex, valueNames);
            }
        }
        if (typeof values !== 'undefined') {
            self.add(values);
        }
    };
    var dateObj = null;
    var initialItems = {
        get: function() {
            // return ListJsHelpers.getByClass('item', self.list);
			var nodes = self.list.childNodes,
				items = [];
			for (var i = 0, il = nodes.length; i < il; i++) {
				// Only textnodes have a data attribute
				if (typeof nodes[i].data === 'undefined') {
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
            if (dateObj == null) {
                dateObj = new Date();
            }
            var itemsToIndex = itemElements.splice(0, 100); // TODO: If < 100 items, what happens in IE etc?
            this.index(itemsToIndex, valueNames);
            if (itemElements.length > 0) {
                setTimeout(function() {
                    initialItems.indexAsync(itemElements, valueNames);
                }, 10);
            } else {
                var time = dateObj.getTime();
                dateObj = new Date();
                // TODO: Add indexed callback
                console.log("Async index took " + (dateObj.getTime() - time));
            }
        }
    }

    /* 
    * Add object to list
    */
    this.add = function(values, options) {
        var added = [], 
            notCreate = false;
        if (typeof values[0] === 'undefined'){
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
        if (dateObj2 == null) {
            dateObj2 = new Date();
        }
        var count = options ? options.count || 100 : 100
            , valuesToAdd = values.splice(0, count);
        self.add(valuesToAdd, options);
        if (values.length > 0) {
            setTimeout(function() {
                self.addAsync(values, options);
            }, 10);
        } else {
            // TODO: Add added callback
                var time = dateObj2.getTime();
                dateObj2 = new Date();
                // TODO: Add indexed callback
                console.log("Async add took " + (dateObj2.getTime() - time));
        }
    }

    /* Removes object from list. 
    * Loops through the list and removes objects where
    * property "valuename" === value
    */
    this.remove = function(valueName, value, options) {
        var found = 0;
        for (var i = 0, il = self.items.length; i < il; i++) {
            if (self.items[i].values()[valueName] === value) {
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
            if (item.values()[valueName] === value) {
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
    this.sort = function(valueOrEvent, sortFunction) {            
        var length = self.items.length,
            value = null; 
        if (valueOrEvent.target === 'undefined') {
            value = valueOrEvent;
        } else {	
            value = ListJsHelpers.getAttribute(valueOrEvent.target, 'rel');
        }
        if (sortFunction) {
            sortFunction = sortFunction;
        } else {
            sortFunction = function(a, b) {
                return sorter.alphanum(a.values()[value], b.values()[value]);
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
    var sorter = {
        alphanum: function(a,b) {
            if (typeof a === 'undefined') {
                a = "";
            }
            if (typeof b === 'undefined') {
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

            for (x = 0; aa[x] && bb[x]; x++) {
                if (aa[x] !== bb[x]) {
                    var c = Number(aa[x]), d = Number(bb[x]);
                    if (c == aa[x] && d == bb[x]) {
                        return c - d;
                    } else { 
                        return (aa[x] > bb[x]) ? 1 : -1;
                    }
                }
            }
            return aa.length - bb.length;
        },
        chunkify: function(t) {
            var tz = [], x = 0, y = -1, n = 0, i, j;

            while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                var m = (i == 46 || (i >=48 && i <= 57));
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
    this.search = function(searchStringOrEvent, columns) {
        var searchString = ''
            , foundItems = [];
        if (typeof searchStringOrEvent.target !== 'undefined') {
            searchString = searchStringOrEvent.target.value.toLowerCase();
        } else {
            searchString = searchStringOrEvent.toLowerCase();
        }
        var useAllColumns = false;
        if (typeof columns === 'undefined') {
            useAllColumns = true;
        }
        templater.clear();
        if (searchString === "") {
            for (var i = 0, il = self.items.length; ((i < il) && (i < self.maxVisibleItemsCount)); i++) {
                self.items[i].show();
            }
        } else {
            for (var i = 0, il = self.items.length; i < il; i++) {
                var found = false,
                    item = self.items[i];
                if (useAllColumns) {
                    columns = item.values();
                }
                for(var j in columns) {
                    var text = columns[j].toString().toLowerCase();
                    if ((searchString !== "") && (text.search(searchString) > -1)) {
                        found = true;
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
            if (filterFunction === false || typeof filterFunction === 'undefined') {
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

    function Item(initValues, element, notCreate) {
        var item = this,
            values = {};

        var init = function(initValues, element, notCreate) {
            if (typeof element === 'undefined') {
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
                values = newValues;
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
    var Templater = function(settings) {
        if (typeof settings.engine === 'undefined') {
            settings.engine = "standard";
        } else {
            settings.engine = settings.engine.toLowerCase();
        }
        return new self.constructor.prototype.templateEngines[settings.engine](settings);
    }

    init(values, templates);
};

List.prototype.templateEngines = {};

List.prototype.templateEngines.standard = function(settings) {
    var listSource = ListJsHelpers.getByClass('list', document.getElementById(settings.list))[0]
        , itemSource = document.getElementById(settings.item)
        , templater = this;
    /* Get values from element */
    this.get = function(item, valueNames) {
        ensureCreated(item);
        var values = {};
        for(var i = 0, il = valueNames.length; i < il; i++) {
            values[valueNames[i]] = ListJsHelpers.getByClass(valueNames[i], item.elm)[0].innerHTML;
        }
        return values;
    };
    
    /* Sets values at element */
    this.set = function(item, values) {
        ensureCreated(item);
        for(var v in values) {
            // TODO speed up if possible
            var hej = ListJsHelpers.getByClass(v, item.elm, true);
            if (hej) {
                hej.innerHTML = values[v];
            }
        }
    };
    
    this.create = function(item) {
        if (typeof item.elm !== 'undefined') {
            return;
        }
        /* If item source does not exists, use the first item in list as 
        source for new items */
        if (itemSource === null) {
			var nodes = listSource.childNodes,
				items = [];
			for (var i = 0, il = nodes.length; i < il; i++) {
				// Only textnodes have a data attribute
				if (typeof nodes[i].data === 'undefined') {
					itemSource = nodes[i];
					break;
				}
			}
            //itemSource = ListJsHelpers.getByClass('item', listSource, true);
        }
        var newItem = itemSource.cloneNode(true);
        newItem.id = "";
        newItem.style.display = "block";
        item.elm = newItem; 
        templater.set(item, item.values());
    };
    this.add = function(item) {
        ensureCreated(item);
        listSource.appendChild(item.elm);
    };
    this.remove = function(item) {
        listSource.removeChild(item.elm);
    };
    this.show = function(item) {
        ensureCreated(item);
        ensureAdded(item);
        item.elm.style.display = "block";
    };
    this.hide = function(item) {
        ensureCreated(item);
        item.elm.style.display = "none";
    };
    this.clear = function() {
        listSource.innerHTML = '';
    }

    function ensureCreated(item) {
        if (typeof item.elm === 'undefined') {
            templater.create(item);
        }
    }
    function ensureAdded(item) {
        if (item.elm.parentNode === null) {
            templater.add(item);
        }
    }
};


/*
* These helper functions are not written by List.js author Jonny (they may have been 
* adjusted, thought).
*/
var ListJsHelpers = {
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
            }
        } else {
            return function(searchClass,node,single) {
                var classElements = new Array();
                if ( node == null )
                node = document;
                tag = '*';
                var els = node.getElementsByTagName(tag);
                var elsLen = els.length;
                var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
                for (i = 0, j = 0; i < elsLen; i++) {
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
            }
        }
    })()
    /* (elm, 'event' callback) Source: http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/ */
    , addEvent: (function( window, document ) {  
        if ( document.addEventListener ) {  
            return function( elem, type, cb ) {
                if ((elem && !(elem instanceof Array) && !elem.length && !ListJsHelpers.isNodeList(elem)) || elem === window ) {  
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
                if ((elem && !(elem instanceof Array) && !elem.length && !ListJsHelpers.isNodeList(elem)) || elem === window ) {  
                    elem.attachEvent( 'on' + type, function() { return cb.call(elem, window.event) } );  
                } else if ( elem && elem[0] !== undefined ) { 
                    var len = elem.length;
                    for ( var i = 0; i < len; i++ ) {
                        ListJsHelpers.addEvent( elem[i], type, cb );
                    }  
                }  
            };  
        }  
    })( this, document )
    /* (elm, attribute) Source: http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method */
    , getAttribute: function(a,b){var c=(a.getAttribute&&a.getAttribute(b))||null;if(!c){var d=a.attributes;var e=d.length;for(var i=0;i<e;i++)if(b[i].nodeName===b)c=b[i].nodeValue}return c}
    // http://blog.stevenlevithan.com/archives/faster-than-innerhtml
    , replaceHtml: function(el, html) {
        var oldEl = typeof el === "string" ? document.getElementById(el) : el;
        /*@cc_on // Pure innerHTML is slightly faster in IE
        oldEl.innerHTML = html;
        return oldEl;
        @*/
        var newEl = oldEl.cloneNode(false);
        newEl.innerHTML = html;
        oldEl.parentNode.replaceChild(newEl, oldEl);
        /* Since we just removed the old element from the DOM, return a reference
        to the new element, which can be used to restore variable references. */
        return newEl;
    },
	// http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript
	isNodeList: function(nodes) {
		var result = Object.prototype.toString.call(nodes);
		if (
			typeof nodes === 'object'
			&&
			/^\[object (HTMLCollection|NodeList|Object)\]$/.test(result)
			&&
			nodes.hasOwnProperty('length')
			&&
			(nodes.length == 0 || (typeof node === "object" && nodes[0].nodeType > 0))
		) {
			return true;
		}
		return false;
	}
};