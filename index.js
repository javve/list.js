/*
ListJS with beta 1.0.0
By Jonny Strömberg (www.jonnystromberg.com, www.listjs.com)
*/
(function( window, undefined ) {
"use strict";

var document = window.document,
    events = require('events'),
    getByClass = require('get-by-class');

var List = function(id, options, values) {

    var self = this,
		init,
        Item = require('./src/item')(self),
        addAsync = require('./src/add-async')(self),
        parse = require('./src/parse')(self);

    options             = options               || {};
    options.listClass   = options.listClass     || 'list';
    options.searchClass = options.searchClass   || 'search';
    options.sortClass   = options.sortClass     || 'sort';
    options.page        = options.page          || 200;
    options.events      = options.events        || {};
    options.i           = options.i             || 1;
    options.plugins     = options.plugins       || {};

    this.options        = options;
    this.i              = options.i;
    this.page           = options.page;
    this.items          = [];
    this.visibleItems   = [];
    this.matchingItems  = [];
    this.searched       = false;
    this.filtered       = false;
    this.events         = { 'updated': [] };

    this.listContainer = (typeof(id) === 'string') ? document.getElementById(id) : id;
    if (!this.listContainer) { return; }
    this.list           = getByClass(self.listContainer, options.listClass, true);

    this.templater      = require('./src/templater')(self);
    this.sort           = require('./src/sort')(self);
    this.search         = require('./src/search')(self);
    this.filter         = require('./src/filter')(self);

    init = {
        start: function(values, options) {
            this.callbacks(options);
            parse(list);
            if (values !== undefined) {
                self.add(values);
            }
            self.update();
            this.plugins(options.plugins);
        },
        callbacks: function(options) {
            events.bind(getByClass(self.listContainer, options.searchClass), 'keyup', self.search);
            for (var i in options.events) {
                self.on(i, options.events[i]);
            }
        },
        plugins: function(plugins) {
            for (var i = 0; i < plugins.length; i++) {
                plugins[i][1] = plugins[i][1] || {};
                var pluginName = plugins[i][1].name || plugins[i][0];
                self[pluginName] = self.plugins[plugins[i][0]].call(self, plugins[i][1]);
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
                self.templater.remove(self.items[i], options);
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
        return matchedItems;
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
        self.templater.clear();
        self.items = [];
    };

    this.on = function(event, callback) {
        self.events[event].push(callback);
    };

    this.trigger = function(event) {
        var i = self.events[event].length;
        while(i--) {
            self.events[event][i](self);
        }
    };

    this.reset = {
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
        self.templater.clear();
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
        self.trigger('updated');
    };

    init.start(values, options);
};

List.prototype.plugins = {};

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
}

})(window);
