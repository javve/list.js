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

module.exports = function(list) {
    var sort = function() {
        var options = {},
            valueName;

        if (arguments[0].currentTarget || arguments[0].srcElement) {
            var e = arguments[0],
                target = e.currentTarget || e.srcElement,
                newSortingOrder;

            valueName = getAttribute(target, 'data-sort');

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
            valueName = arguments[0];
            options = arguments[1] || options;
        }

        options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
        options.sortFunction = options.sortFunction || function(a, b) {
            return naturalSort(a.values()[valueName], b.values()[valueName], options);
        };

        list.trigger('sortStart');
        list.items.sort(options.sortFunction);
        list.update();
        list.trigger('sortComplete');
    };

    // Add handlers
    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];

    sortButtons = getByClass(list.listContainer, list.sortClass);
    events.bind(sortButtons, 'click', sort);

    return sort;
};
