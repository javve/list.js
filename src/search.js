module.exports = function(list) {

    // Add events
    list.events.searchStart = [],
    list.events.searchComplete = [],

    return function(searchString, columns) {
        list.trigger('searchStart');
        list.i = 1; // Reset paging

        var matching = [],
            found,
            item,
            text,
            values,
            is,
            searchEscape = /[-[\]{}()*+?.,\\^$|#\s]/g,
            columns = (columns === undefined) ? list.items[0].values() : columns,
            searchString = (searchString === undefined) ? "" : searchString,
            target = searchString.target || searchString.srcElement; /* IE have srcElement */

        // Convert { name: 'yadda' } into [ 'name' ]
        if (columns.constructor == Object) {
            var tmpColumn = [];
            for (var name in columns) {
                tmpColumn.push(name);
            }
            columns = tmpColumn;
        }

        searchString = (target === undefined) ? (""+searchString).toLowerCase() : ""+target.value.toLowerCase();
        is = list.items;
        // Escape regular expression characters
        searchString = searchString.replace(searchEscape, "\\$&");

        list.templater.clear();
        if (searchString === "" ) {
            list.reset.search();
            list.searched = false;
            list.update();
        } else {
            list.searched = true;

            for (var k = 0, kl = is.length; k < kl; k++) {
                found = false;
                item = is[k];
                values = item.values();

                for(var j = 0, jl = columns.length; j < jl; j++) {
                    if(values.hasOwnProperty(columns[j])) {
                        text = (values[columns[j]] != null) ? values[columns[j]].toString().toLowerCase() : "";
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
            list.update();
        }
        list.trigger('searchComplete');
        return list.visibleItems;
    };
};