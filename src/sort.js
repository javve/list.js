var naturalSort = require('natural-sort'),
    classes = require('classes'),
    events = require('events'),
    getByClass = require('get-by-class'),
    getAttribute = require('get-attribute'),
    sortButtons;

var clearPreviousSorting = function() {
    for (var i = 0, il = sortButtons.length; i < il; i++) {
        classes(sortButtons[i]).remove('asc');
        classes(sortButtons[i]).remove('desc');
    }
};

var defaultSortFunction = function(a, b) {
    return naturalSort(a.values()[this.valueName], b.values()[this.valueName], this);
};

module.exports = function(list) {
    var sort = function() {
        var options = {};

        if (arguments[0].currentTarget || arguments[0].srcElement) {
            var e = arguments[0],
                target = e.currentTarget || e.srcElement,
                newSortingOrder;

            options.valueName = getAttribute(target, 'data-sort');

            if (classes(target).has('desc')) {
                options.desc = false;
                newSortingOrder = 'asc';
            } else if (classes(target).has('asc')) {
                options.desc = true;
                newSortingOrder = 'desc';
            } else {
                options.desc = false;
                newSortingOrder = 'asc';
            }
            clearPreviousSorting();
            classes(target).add(newSortingOrder);
        } else {
            options = arguments[1] || options;
            options.valueName = options.valueName || arguments[0];
        }

        options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
        options.sortFunction = options.sortFunction || list.sortFunction || defaultSortFunction;

        list.trigger('sortStart');
        list.items.sort(function(a, b) {
            return options.sortFunction(a, b);
        });
        list.update();
        list.trigger('sortComplete');
    };

    // Expose the naturalSort function so that custom sort functions can make use of it.
    sort.naturalSort = naturalSort;

    // Add handlers
    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];

    sortButtons = getByClass(list.listContainer, list.sortClass);
    events.bind(sortButtons, 'click', sort);

    return sort;
};
