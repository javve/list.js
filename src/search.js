var events = require('events'),
    getByClass = require('get-by-class');

module.exports = function(list) {
    var matching = [],
        found,
        item,
        text,
        columns,
        searchString;

    var prepare = {
        resetList: function() {
            list.i = 1;
            list.templater.clear();
        },
        setColumns: function(cols) {
            columns = (cols === undefined) ? list.items[0].values() : cols;
            prepare.columnsToArray();
        },
        setSearchString: function(s) {
            s = (s === undefined) ? "" : s;
            s = s.target || s.srcElement || s; // IE have srcElement
            s = s.value || s;
            s = s.toLowerCase();
            s = s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); // Escape regular expression characters
            searchString = s;
        },
        columnsToArray: function() {
            if (columns.constructor == Object) {
                var tmpColumn = [];
                for (var name in columns) {
                    tmpColumn.push(name);
                }
                columns = tmpColumn;
            }
        }
    };
    var search = {
        list: function() {
            list.searched = true;
            for (var k = 0, kl = list.items.length; k < kl; k++) {
                search.item(list.items[k]);
            }
        },
        item: function(item) {
            item.found = false;
            for (var j = 0, jl = columns.length; j < jl; j++) {
                if (search.values(item.values(), columns[j])) {
                    item.found = true;
                    matching.push(item);
                    return;
                }
            }
        },
        values: function(values, column) {
            if (values.hasOwnProperty(column)) {
                text = (values[column] != null) ? values[column].toString().toLowerCase() : "";
                if ((searchString !== "") && (text.search(searchString) > -1)) {
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            list.reset.search();
            list.searched = false;
        }
    };

    var searchMethod = function(str, cols) {
        list.trigger('searchStart');

        prepare.resetList();
        prepare.setSearchString(str);
        prepare.setColumns(cols);

        if (searchString === "" ) {
            search.reset();
        } else {
            search.list();
        }
        list.update();
        list.trigger('searchComplete');
        return list.visibleItems;
    };

    // Add handlers
    list.handlers.searchStart = list.handlers.searchStart || [];
    list.handlers.searchComplete = list.handlers.searchComplete || [];

    events.bind(getByClass(list.listContainer, list.searchClass), 'keyup', searchMethod);

    return searchMethod;
};