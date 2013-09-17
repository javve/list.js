List.prototype.plugins.filtering = function(locals, options) {
    var list = this;
    var container = $("#" + list.listContainer.id);
    var filters = {};
    var init = function() {
        options = options || {};
        options.allLabel = options.allLabel || 'All';

        container.find('[data-filter="dropdown"]').each(function(){
            var filter = $(this);
            var filterElement = $('<select></select>');
            filter.append(filterElement);
            var property = filter.attr("data-filter-property");
            var values = get.values(property).unique();
            var item = $("<option>" + options.allLabel + "</option>");
            item.data('value', '');
            filterElement.append(item);

            for (var i = values.length - 1; i >= 0; i--) {
                var value = values[i];
                if (value !== '') {
                    var item = $("<option>"+value+"</option>");
                    // Using data instead of value to prevent character conflicts
                    item.data('value', value)
                    filterElement.append(item);
                }
            };
            filterElement.change(function() {
                filters[property] = filterElement.find('option:selected').data('value').split(',');
                updateFilters();
            });
        });

        container.find('[data-filter-set]').live('click', function(){
            var filter = $(this);
            var value = filter.attr('data-filter-set');
            var property = filter.parents('[data-filter-property]').attr('data-filter-property');
            if (value == "") {
                delete filters[property];
            } else {
                filters[property] = value.split(",");
            }
            updateFilters();
        });
    };

    var updateFilters = function() {
        list.filter(function(item) {
            var matching = true;
            $.each(filters, function(property, values){
                // Reset the filter if nothing is specified
                if (values.length == 0 || values[0] == '') {
                    return;
                }
                if (values.indexOf(item.values()[property]) == -1) {
                    matching = false;
                }
            });
            return matching;
        });
    }

    var get = {
        values: function(property){
            var values = [];
            for (var i = list.items.length - 1; i >= 0; i--) {
                var item = list.items[i];
                values.push(item.values()[property]);
            };
            return values;
        }
    }

    Array.prototype.unique = function() {
        var o = {}, i, l = this.length, r = [];
        for(i=0; i<l;i+=1) o[this[i]] = this[i];
        for(i in o) r.push(o[i]);
        return r;
    };

    init();
    return this;
};