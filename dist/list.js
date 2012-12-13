;(function(){
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(p, parent, orig){
  var path = require.resolve(p)
    , mod = require.modules[path];

  // lookup failed
  if (null == path) {
    orig = orig || p;
    parent = parent || 'root';
    throw new Error('failed to require "' + orig + '" from "' + parent + '"');
  }

  // perform real require()
  // by invoking the module's
  // registered function
  if (!mod.exports) {
    mod.exports = {};
    mod.client = mod.component = true;
    mod.call(this, mod, mod.exports, require.relative(path));
  }

  return mod.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path){
  var orig = path
    , reg = path + '.js'
    , regJSON = path + '.json'
    , index = path + '/index.js'
    , indexJSON = path + '/index.json';

  return require.modules[reg] && reg
    || require.modules[regJSON] && regJSON
    || require.modules[index] && index
    || require.modules[indexJSON] && indexJSON
    || require.modules[orig] && orig
    || require.aliases[index];
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `fn`.
 *
 * @param {String} path
 * @param {Function} fn
 * @api private
 */

require.register = function(path, fn){
  require.modules[path] = fn;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to){
  var fn = require.modules[from];
  if (!fn) throw new Error('failed to alias "' + from + '", it does not exist');
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj){
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function fn(path){
    var orig = path;
    path = fn.resolve(path);
    return require(path, parent, orig);
  }

  /**
   * Resolve relative to the parent.
   */

  fn.resolve = function(path){
    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    if ('.' != path.charAt(0)) {
      var segs = parent.split('/');
      var i = lastIndexOf(segs, 'deps') + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
      return path;
    }
    return require.normalize(p, path);
  };

  /**
   * Check if module is defined at `path`.
   */

  fn.exists = function(path){
    return !! require.modules[fn.resolve(path)];
  };

  return fn;
};require.register("component-indexof/index.js", function(module, exports, require){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});
require.register("component-classes/index.js", function(module, exports, require){

/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Toggle class `name`.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name){
  // classList
  if (this.list) {
    this.list.toggle(name);
    return this;
  }

  // fallback
  if (this.has(name)) {
    this.remove(name);
  } else {
    this.add(name);
  }
  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var arr = this.el.className.split(re);
  if ('' === arr[0]) arr.pop();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

});
require.register("component-event/index.js", function(module, exports, require){

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture);
  } else {
    el.attachEvent('on' + type, fn);
  }
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture);
  } else {
    el.detachEvent('on' + type, fn);
  }
};
});
require.register("component-type/index.js", function(module, exports, require){

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function';
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val === Object(val)) return 'object';

  return typeof val;
};

});
require.register("timoxley-is-collection/index.js", function(module, exports, require){
var typeOf = require('type')

/**
 * Evaluates _obj_ to determine if it's an array, an array-like collection, or
 * something else. This is useful when working with the function `arguments`
 * collection and `HTMLElement` collections.
 * Note: This implementation doesn't consider elements that are also
 *
 *
  
  collections, such as `<form>` and `<select>`, to be array-like.

  @method test
@param {Object} obj Object to test.
@return {Number} A number indicating the results of the test:

 * 0: Neither an array nor an array-like collection.
 * 1: Real array.
 * 2: Array-like collection.

@api private
 **/
module.exports = function isCollection(obj) {
  var type = typeOf(obj)
  if (type === 'array') return 1
    switch (type) {
      case 'arguments': return 2
      case 'object':
        if (isNodeList(obj)) return 2
        try {
          // indexed, but no tagName (element) or scrollTo/document (window. From DOM.isWindow test which we can't use here),
          // or functions without apply/call (Safari
          // HTMLElementCollection bug).
          if ('length' in obj
              && !obj.tagName
            && !(obj.scrollTo && obj.document)
            && !obj.apply) {
              return 2
            }
        } catch (ex) {}
      default:
        return 0
    }
}

function isNodeList(nodes) {
  return typeof nodes === 'object'
  && /^\[object (NodeList)\]$/.test(Object.prototype.toString.call(nodes))
  && nodes.hasOwnProperty('length')
  && (nodes.length == 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0))
}


});
require.register("javve-events/index.js", function(module, exports, require){
var events = require('event'),
  isCollection = require('is-collection');

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (!isCollection(el)) {
    events.bind(el, type, fn, capture);
  } else if ( el && el[0] !== undefined ) {
    for ( var i = 0; i < el.length; i++ ) {
      events.bind(el[i], type, fn, capture);
    }
  }
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (!isCollection(el)) {
    events.unbind(el, type, fn, capture);
  } else if ( el && el[0] !== undefined ) {
    for ( var i = 0; i < el.length; i++ ) {
      events.unbind(el[i], type, fn, capture);
    }
  }
};
});
require.register("javve-get-by-class/index.js", function(module, exports, require){
/**
 * Find all elements with class `className` inside `container`.
 * Use `single = true` to increase performance in older browsers
 * when only one element is needed.
 *
 * @param {String} className
 * @param {Element} container
 * @param {Boolean} single
 * @api public
 */

module.exports = (function() {
  if (document.getElementsByClassName) {
    return function(className, container, single) {
      if (single) {
        return container.getElementsByClassName(className)[0];
      } else {
        return container.getElementsByClassName(className);
      }
    };
  } else if (document.querySelector) {
    return function(className, container, single) {
      if (single) {
        return container.querySelector(className);
      } else {
        return container.querySelectorAll(className);
      }
    };
  } else {
    return function(className, container, single) {
      var classElements = [],
        tag = '*';
      if (container == null) {
        container = document;
      }
      var els = container.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");
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
})();

});
require.register("javve-get-attribute/index.js", function(module, exports, require){
/**
 * Return the value for `attr` at `element`.
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */

module.exports = function(el, attr) {
  var result = (el.getAttribute && el.getAttribute(attr)) || null;
  if( !result ) {
    var attrs = el.attributes;
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
}
});
require.register("list/index.js", function(module, exports, require){
/*
ListJS with beta 0.2.2
By Jonny Strömberg (www.jonnystromberg.com, www.listjs.com)

Contributors
* lusentis (Simone Lusenti) - http://www.plasticpanda.com
* dancrew32 (Dan Masquelier) - http://danmasq.com
* himynameisjonas (Jonas Forsberg) - http://jonasforsberg.se
* endorama (Edoardo Tenani)
* sprynmr (Bob Spryn)
* francescolaffi
* ryantanner
* idlefella
* julienbechade (Julien Béchade) - http://julienbechade.com/
* matthewheston
* gvido (Gvido Glazers)
* karlwestin (Karl Westin) - http://karlwestin.com

License (MIT)

Copyright (c) 2011 Jonny Strömberg http://jonnystromberg.com

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
	h,
    events = require('events'),
    classes = require('classes'),
    getByClass = require('get-by-class'),
    getAttribute = require('get-attribute');


var List = function(id, options, values) {
    var self = this,
		templater,
		init,
		initialItems,
		Item,
		Templater,
		sortButtons;

	this.events = {
	    'updated': [],
        'searchStart': [],
        'filterStart': [],
        'sortStart': [],
        'searchComplete': [],
        'filterComplete': [],
        'sortComplete': []
	};
    this.listContainer = (typeof(id) == 'string') ? document.getElementById(id) : id;
    // Check if the container exists. If not return instead of breaking the javascript
    if (!this.listContainer)
        return;

    this.items = [];
    this.visibleItems = []; // These are the items currently visible
    this.matchingItems = []; // These are the items currently matching filters and search, regadlessof visible count
    this.searched = false;
    this.filtered = false;

    this.list = null;
    this.templateEngines = {};

    this.page = options.page || 200;
    this.i = options.i || 1;

    init = {
        start: function(values, options) {
            options.plugins = options.plugins || {};
            options.events = options.events || {};
            this.classes(options);
            templater = new Templater(self, options);
            self.list = getByClass(options.listClass, self.listContainer, true);
            this.callbacks(options);
            this.items.start(values, options);
            self.update();
            this.plugins(options.plugins);
        },
        classes: function(options) {
            options.listClass = options.listClass || 'list';
            options.searchClass = options.searchClass || 'search';
            options.sortClass = options.sortClass || 'sort';
        },
        callbacks: function(options) {
            events.bind(getByClass(options.searchClass, self.listContainer), 'keyup', self.search);
            sortButtons = getByClass(options.sortClass, self.listContainer);
            events.bind(sortButtons, 'click', self.sort);
            for (var i in options.events) {
                self.on(i, options.events[i]);
            }
        },
        items: {
            start: function(values, options) {
                if (options.valueNames) {
                    var itemsToIndex = this.get(),
                    valueNames = options.valueNames;
                    if (options.indexAsync) {
                        this.indexAsync(itemsToIndex, valueNames);
                    } else {
                        this.index(itemsToIndex, valueNames);
                    }
                }
                if (values !== undefined) {
                    self.add(values);
                }
            },
            get: function() {
                // return getByClass('item', self.list);
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
                        init.items.indexAsync(itemElements, valueNames);
                        },
                    10);
                } else {
                    self.update();
                    // TODO: Add indexed callback
                }
            }
        },
        plugins: function(plugins) {
            var locals = {
                templater: templater,
                init: init,
                initialItems: initialItems,
                Item: Item,
                Templater: Templater,
                sortButtons: sortButtons,
                reset: reset
            };
            for (var i = 0; i < plugins.length; i++) {
                plugins[i][1] = plugins[i][1] || {};
                var pluginName = plugins[i][1].name || plugins[i][0];
                self[pluginName] = self.plugins[plugins[i][0]].call(self, locals, plugins[i][1]);
            }
        }
    };


    /*
    * Add object to list
    */
    this.add = function(values, callback) {
        if (callback) {
            addAsync(values, callback);
            return;
        }
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
                notCreate = (self.items.length > self.page) ? true : false;
                item = new Item(values[i], undefined, notCreate);
            }
            self.items.push(item);
            added.push(item);
        }
        self.update();
        return added;
    };

    /*
    * Adds items asynchronous to the list, good for adding huge amount of
    * data. Defaults to add 100 items a time
    */
    var addAsync = function(values, callback, items) {
        var valuesToAdd = values.splice(0, 100);
        items = items || [];
        items = items.concat(self.add(valuesToAdd));
        if (values.length > 0) {
            setTimeout(function() {
                addAsync(values, callback, items);
            }, 10);
        } else {
            self.update();
            callback(items);
        }
    };

	this.show = function(i, page) {
		this.i = i;
		this.page = page;
		self.update();
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
        self.update();
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
    */
    this.sort = function(valueName, options) {
        trigger('sortStart');
        var length = self.items.length,
            value = null,
            target = valueName.target || valueName.srcElement, /* IE have srcElement */
            sorting = '',
            isAsc = false,
            asc = 'asc',
            desc = 'desc',
            options = options || {};

        if (target === undefined) {
            value = valueName;
            isAsc = options.asc || false;
        } else {
            value = getAttribute(target, 'data-sort');
            isAsc = classes(target).has(asc) ? false : true;
        }
        for (var i = 0, il = sortButtons.length; i < il; i++) {
            classes(sortButtons[i]).remove(asc);
            classes(sortButtons[i]).remove(desc);
        }
        if (isAsc) {
            if (target !== undefined) {
                classes(target).add(asc);
            }
            isAsc = true;
        } else {
            if (target !== undefined) {
                classes(target).add(desc);
            }
            isAsc = false;
        }

        if (options.sortFunction) {
            options.sortFunction = options.sortFunction;
        } else {
            options.sortFunction = function(a, b) {
                return h.sorter.alphanum(a.values()[value], b.values()[value], isAsc);
            };
        }
        self.items.sort(options.sortFunction);
        self.update();
        trigger('sortComplete');
    };

    /*
    * Searches the list after values with content "searchStringOrEvent".
    * The columns parameter defines if all values should be included in the search,
    * defaults to undefined which means "all".
    */
    this.search = function(searchString, columns) {
        trigger('searchStart');
        self.i = 1; // Reset paging
        var matching = [],
            found,
            item,
            text,
            values,
            is,
            columns = (columns === undefined) ? self.items[0].values() : columns,
            searchString = (searchString === undefined) ? "" : searchString,
            target = searchString.target || searchString.srcElement; /* IE have srcElement */

        searchString = (target === undefined) ? (""+searchString).toLowerCase() : ""+target.value.toLowerCase();
        is = self.items;
        // Escape regular expression characters
        searchString = searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        templater.clear();
        if (searchString === "" ) {
            reset.search();
            self.searched = false;
            self.update();
        } else {
            self.searched = true;

            for (var k = 0, kl = is.length; k < kl; k++) {
                found = false;
                item = is[k];
                values = item.values();

                for(var j in columns) {
                    if(values.hasOwnProperty(j) && columns[j] !== null) {
                        text = (values[j] != null) ? values[j].toString().toLowerCase() : "";
                        if ((searchString !== "") && (text.search(searchString) > -1)) {
                            found = true;
                        }
                    }
                }
                if (found) {
                    item.found = true;
                    matching.push(item);
                } else {
                    item.found = false;
                }
            }
            self.update();
        }
        trigger('searchComplete');
        return self.visibleItems;
    };

    /*
    * Filters the list. If filterFunction() returns False hides the Item.
    * if filterFunction == false are the filter removed
    */
    this.filter = function(filterFunction) {
        trigger('filterStart');
        self.i = 1; // Reset paging
        reset.filter();
        if (filterFunction === undefined) {
            self.filtered = false;
        } else {
            self.filtered = true;
            var is = self.items;
            for (var i = 0, il = is.length; i < il; i++) {
                var item = is[i];
                if (filterFunction(item)) {
                    item.filtered = true;
                } else {
                    item.filtered = false;
                }
            }
        }
        self.update();
        trigger('filterComplete');
        return self.visibleItems;
    };

    /*
    * Get size of the list
    */
    this.size = function() {
        return self.items.length;
    };

    /*
    * Removes all items from the list
    */
    this.clear = function() {
        templater.clear();
        self.items = [];
    };

    this.on = function(event, callback) {
        self.events[event].push(callback);
    };

    var trigger = function(event) {
        var i = self.events[event].length;
        while(i--) {
            self.events[event][i](self);
        }
    };

    var reset = {
        filter: function() {
            var is = self.items,
                il = is.length;
            while (il--) {
                is[il].filtered = false;
            }
        },
        search: function() {
            var is = self.items,
                il = is.length;
            while (il--) {
                is[il].found = false;
            }
        }
    };


    this.update = function() {
        var is = self.items,
			il = is.length;

        self.visibleItems = [];
        self.matchingItems = [];
        templater.clear();
        for (var i = 0; i < il; i++) {
            if (is[i].matching() && ((self.matchingItems.length+1) >= self.i && self.visibleItems.length < self.page)) {
                is[i].show();
                self.visibleItems.push(is[i]);
                self.matchingItems.push(is[i]);
			} else if (is[i].matching()) {
                self.matchingItems.push(is[i]);
                is[i].hide();
			} else {
                is[i].hide();
			}
        }
        trigger('updated');
    };

    Item = function(initValues, element, notCreate) {
        var item = this,
            values = {};

        this.found = false; // Show if list.searched == true and this.found == true
        this.filtered = false;// Show if list.filtered == true and this.filtered == true

        var init = function(initValues, element, notCreate) {
            if (element === undefined) {
                if (notCreate) {
                    item.values(initValues, notCreate);
                } else {
                    item.values(initValues);
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
                    values[name] = newValues[name];
                }
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
        this.matching = function() {
            return (
                (self.filtered && self.searched && item.found && item.filtered) ||
               	(self.filtered && !self.searched && item.filtered) ||
                (!self.filtered && self.searched && item.found) ||
                (!self.filtered && !self.searched)
            );
        };
        this.visible = function() {
            return (item.elm.parentNode) ? true : false;
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

    init.start(values, options);
};

List.prototype.templateEngines = {};
List.prototype.plugins = {};

List.prototype.templateEngines.standard = function(list, settings) {
    var listSource = getByClass(settings.listClass, list.listContainer, true),
        itemSource = getItemSource(settings.item),
        templater = this;

    function getItemSource(item) {
        if (item === undefined) {
            var nodes = listSource.childNodes,
                items = [];

            for (var i = 0, il = nodes.length; i < il; i++) {
                // Only textnodes have a data attribute
                if (nodes[i].data === undefined) {
                    return nodes[i];
                }
            }
            return null;
        } else if (item.indexOf("<") !== -1) { // Try create html element of list, do not work for tables!!
            var div = document.createElement('div');
            div.innerHTML = item;
            return div.firstChild;
        } else {
            return document.getElementById(settings.item);
        }
    }

    /* Get values from element */
    this.get = function(item, valueNames) {
        templater.create(item);
        var values = {};
        for(var i = 0, il = valueNames.length; i < il; i++) {
            var elm = getByClass(valueNames[i], item.elm, true);
            values[valueNames[i]] = elm ? elm.innerHTML : "";
        }
        return values;
    };

    /* Sets values at element */
    this.set = function(item, values) {
        if (!templater.create(item)) {
            for(var v in values) {
                if (values.hasOwnProperty(v)) {
                    // TODO speed up if possible
                    var elm = getByClass(v, item.elm, true);
                    if (elm) {
                        elm.innerHTML = values[v];
                    }
                }
            }
        }
    };

    this.create = function(item) {
        if (item.elm !== undefined) {
            return false;
        }
        /* If item source does not exists, use the first item in list as
        source for new items */
        var newItem = itemSource.cloneNode(true);
        newItem.id = "";
        item.elm = newItem;
        templater.set(item, item.values());
        return true;
    };
    this.remove = function(item) {
        listSource.removeChild(item.elm);
    };
    this.show = function(item) {
        templater.create(item);
        listSource.appendChild(item.elm);
    };
    this.hide = function(item) {
        if (item.elm !== undefined && item.elm.parentNode === listSource) {
            listSource.removeChild(item.elm);
        }
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
h = {
    /*
    * The sort function. From http://my.opera.com/GreyWyvern/blog/show.dml/1671288
    */
    sorter: {
        alphanum: function(a,b,asc) {
            if (a === undefined || a === null) {
                a = "";
            }
            if (b === undefined || b === null) {
                b = "";
            }
            a = a.toString().toLowerCase().replace(/&(lt|gt);/g, function (strMatch, p1){
                return (p1 == "lt")? "<" : ">";
            });
            a = a.replace(/<\/?[^>]+(>|$)/g, "");

            b = b.toString().toLowerCase().replace(/&(lt|gt);/g, function (strMatch, p1){
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
    }
};

// AMD support
if (typeof define === 'function' && define.amd) {
    define(function () { return List; });
// CommonJS and Node.js module support.
} else if (typeof exports !== 'undefined') {
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module != 'undefined' && module.exports) {
        exports = module.exports = List;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.List = List;
} else {
    window.List = List;
    window.ListJsHelpers = h;
}

})(window);

});
require.alias("component-classes/index.js", "list/deps/classes/index.js");
require.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js");

require.alias("javve-events/index.js", "list/deps/events/index.js");
require.alias("component-event/index.js", "javve-events/deps/event/index.js");

require.alias("timoxley-is-collection/index.js", "javve-events/deps/is-collection/index.js");
require.alias("component-type/index.js", "timoxley-is-collection/deps/type/index.js");

require.alias("javve-get-by-class/index.js", "list/deps/get-by-class/index.js");

require.alias("javve-get-attribute/index.js", "list/deps/get-attribute/index.js");
  if ("undefined" == typeof module) {
    window.List = require("list");
  } else {
    module.exports = require("list");
  }
})();