var naturalSort = require('natural-sort'),
    classes = require('classes'),
    events = require('events'),
    getByClass = require('get-by-class'),
    getAttribute = require('get-attribute');

module.exports = function(list) {
    list.sortFunction = list.sortFunction || function(itemA, itemB, options) {
        options.desc = options.order == "desc" ? true : false; // Natural sort uses this format
        return naturalSort(itemA.values()[options.valueName], itemB.values()[options.valueName], options);
    };

    var buttons = {
        els: undefined,
        clear: function() {
            for (var i = 0, il = buttons.els.length; i < il; i++) {
                classes(buttons.els[i]).remove('asc');
                classes(buttons.els[i]).remove('desc');
            }
        },
        getOrder: function(btn) {
            var predefinedOrder = getAttribute(btn, 'data-order');
            if (predefinedOrder == "asc" || predefinedOrder == "desc") {
                return predefinedOrder;
            } else if (classes(btn).has('desc')) {
                return "asc";
            } else if (classes(btn).has('asc')) {
                return "desc";
            } else {
                return "asc";
            }
        },
        getInSensitive: function(btn, options) {
            var insensitive = getAttribute(btn, 'data-insensitive');
            if (insensitive === "true") {
                options.insensitive = true;
            } else {
                options.insensitive = false;
            }
        },
        setOrder: function(options) {
            for (var i = 0, il = buttons.els.length; i < il; i++) {
                var btn = buttons.els[i];
                if (getAttribute(btn, 'data-sort') !== options.valueName) {
                    continue;
                }
                var predefinedOrder = getAttribute(btn, 'data-order');
                if (predefinedOrder == "asc" || predefinedOrder == "desc") {
                    if (predefinedOrder == options.order) {
                        classes(btn).add(options.order);
                    }
                } else {
                    classes(btn).add(options.order);
                }
            }
        }
    };
    var sort = function() {
        list.trigger('sortStart');
        options = {};

        var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

        if (target) {
            options.valueName = getAttribute(target, 'data-sort');
            buttons.getInSensitive(target, options);
            options.order = buttons.getOrder(target);
        } else {
            options = arguments[1] || options;
            options.valueName = arguments[0];
            options.order = options.order || "asc";
            options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
        }
        buttons.clear();
        buttons.setOrder(options);

        options.sortFunction = options.sortFunction || list.sortFunction;
        list.items.sort(function(a, b) {
            return options.sortFunction(a, b, options);
        });
        list.update();
        list.trigger('sortComplete');
    };

    // Add handlers
    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];

    buttons.els = getByClass(list.listContainer, list.sortClass);
    events.bind(buttons.els, 'click', sort);
    list.on('searchStart', buttons.clear);
    list.on('filterStart', buttons.clear);

    // Helpers
    list.helpers.classes = classes;
    list.helpers.naturalSort = naturalSort;
    list.helpers.events = events;
    list.helpers.getAttribute = getAttribute;

    return sort;
};
