var naturalSort = require('natural-sort'),
    classes = require('classes'),
    events = require('events'),
    getByClass = require('get-by-class'),
    getAttribute = require('get-attribute');

module.exports = function(list) {
    var sortButtons, options, valueName;

    list.sortFunction = list.sortFunction || function(itemA, itemB) {
        return naturalSort(itemA.values()[valueName], itemB.values()[valueName], options);
    };

    var buttons = {
        els: undefined,
        clear: function() {
            for (var i = 0, il = buttons.els.length; i < il; i++) {
                classes(buttons.els[i]).remove('asc');
                classes(buttons.els[i]).remove('desc');
            }
        },
        getOrder: function(btn, options) {
            var predefinedOrder = getAttribute(btn, 'data-order');
            if (predefinedOrder == "asc" || predefinedOrder == "desc") {
                optionss.order = predefinedOrder;
            } else if (classes(btn).has('desc')) {
                options.order = "asc";
            } else if (classes(btn).has('asc')) {
                options.order = "desc";
            } else {
                options.order = "asc";
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
        setOrder: function(btn, options) {
            classes(btn).add(options.order);
        }
    };
    var sort = function() {
        list.trigger('sortStart');
        options = {},
        valueName = "";

        var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

        if (target) {
            valueName = getAttribute(target, 'data-sort');
            buttons.getInSensitive(target, options);
            buttons.getOrder(target, options);
            buttons.clear();
            buttons.setOrder(target, options);
        } else {
            valueName = arguments[0];
            options = arguments[1] || options;
            options.order = options.order || "asc";
            options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
        }

        options.desc = options.order == "desc" ? true : false;
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

    // Helpers
    list.helpers.classes = classes;
    list.helpers.naturalSort = naturalSort;
    list.helpers.events = events;
    list.helpers.getAttribute = getAttribute;

    return sort;
};
