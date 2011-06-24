function List(id, templates, values) {
    var self = this;
    this.listContainer = document.getElementById(id);
    this.items = [];
    this.list = null;
    var templater = null;

    var helpers = {
        /* (node, class) Source: http://www.dustindiaz.com/getelementsbyclass */ 
        getByClass: function(d,e){if(d.getElementsByClassName){return d.getElementsByClassName(e)}else{return(function getElementsByClass(a,b){if(b==null)b=document;var c=[],els=b.getElementsByTagName("*"),elsLen=els.length,pattern=new RegExp("(^|\\s)"+a+"(\\s|$)"),i,j;for(i=0,j=0;i<elsLen;i++){if(pattern.test(els[i].className)){c[j]=els[i];j++}}return c})(e,d)}}
        /* (elm, 'event' callback) Source: http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/ */
        , addEvent: (function(e,f){if(f.addEventListener){return function(a,b,c){if((a&&!a.length)||a===e){a.addEventListener(b,c,false)}else if(a&&a.length){var d=a.length;for(var i=0;i<d;i++){helpers.addEvent(a[i],b,c)}}}}else if(f.attachEvent){return function(a,b,c){if((a&&!a.length)||a===e){a.attachEvent('on'+b,function(){return c.call(a,e.event)})}else if(a.length){var d=a.length;for(var i=0;i<d;i++){addEvent(a[i],b,c)}}}}})(this,document)
        /* (elm, attribute) Source: http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method */
        , getAttribute: function(a,b){var c=(a.getAttribute&&a.getAttribute(b))||null;if(!c){var d=a.attributes;var e=d.length;for(var i=0;i<e;i++)if(b[i].nodeName===b)c=b[i].nodeValue}return c}
    };

    var init = function(values, templates) {
        templater = new Templater(templates);
        self.list = helpers.getByClass(self.listContainer, 'list')[0];
        helpers.addEvent(helpers.getByClass(self.listContainer, 'search'), 'keyup', self.search);
        helpers.addEvent(helpers.getByClass(self.listContainer, 'sort'), 'click', self.sort);
        self.add(values);
    };

    /* Add object to list
    * 
    */
    this.add = function(values, options) {
        var added = [];

        if (typeof values[0] === 'undefined'){
            values = [values];
        }
        for (var i = 0, il = values.length; i < il; i++) {
            var item = null;
            if (values[i] instanceof Item) {
                item = values[i];
                item.reload();
            } else {
                item = new Item(values[i]);
            }
            templater.add(item, options);
            self.items.push(item);
            added.push(item);
        }
        return added;
    };

    /* Removes object from list. 
    * Loops through the list and removes objects where
    * property "valuename" === value
    */
    this.remove = function(valueName, value, options) {
        var found = false;
        for (var i = 0, il = self.items.length; i < il; i++) {
            if (self.items[i].getValues()[valueName] === value) {
                templater.remove(self.items[i], options);
                self.items.splice(i,1);
                il--;
                found = true;
            }
        }
        return found;
    };

    /* Gets the objects in the list which 
    * property "valueName" === value
    */
    this.get = function(valueName, value) {
        var items = [];
        for (var i = 0, il = self.items.length; i < il; i++) {
            var item = self.items[i];
            if (item.getValues()[valueName] === value) {
                items.push(item);
            }
        }
        return item;
    };

    /* Sorts the list 
    *  TODO: Desc || Asc
    */
    this.sort = function(valueOrEvent, sortFunction) {
        var length = self.items.length,
            value = null; 
        if (valueOrEvent.target === 'undefined') {
            value = valueOrEvent;
        } else {	
            value = helpers.getAttribute(valueOrEvent.target, 'rel');
        }
        if (sortFunction) {
            sortFunction = sortFunction;
        } else {
            sortFunction = function(a, b) {
                return sorter.alphanum(a.getValues()[value], b.getValues()[value]);
            };
        }
        self.items.sort(sortFunction);
        self.list.innerHTML = "";
        for (var i = 0, il = self.items.length; i < il; i++) {
            self.list.appendChild(self.items[i].elm);
        }
    };

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
        var searchString = '';
        if (typeof event.target !== 'undefined') {
            searchString = searchStringOrEvent.target.value.toLowerCase();
        } else {
            searchString = searchStringOrEvent;
        }
        var useAllColumns = false;
        if (typeof columns === 'undefined') {
            useAllColumns = true;
        }
        for (var i = 0, il = self.items.length; i < il; i++) {
            var found = false,
                item = self.items[i];
            if (useAllColumns) {
                columns = item.getValues();
            }
            for(var j in columns) {
                var text = columns[j].toString().toLowerCase();
                if ((searchString !== "") && (text.search(searchString) > -1)) {
                    found = true;
                }
            }
            if (found || (searchString === "")) {
                item.elm.style.display = "block";
            } else {
                item.elm.style.display = "none";
            }
        }
    };

    /*
    * Filters the list. If filterFunction() returns False hides the Item.
    * if filterFunction == false are the filter removed
    */
    this.filter = function(filterFunction) {
        for (var i = 0, il = self.items.length; i < il; i++) {
            var item = self.items[i];
            if (filterFunction === false) {
                item.show();
            } else {
                if (filterFunction(item.getValues())) {
                    item.show();
                } else {
                    item.hide();
                }
            }
        }
    };
    /*
    this.reload = function() {
        $(this.items).each(function(i) {
            this.reload();
        });
    };
    */

    function Item(initValues) {
        var item = this,
            values = {};

        var init = function(initValues) {
            item.setValues(initValues);
        };
        this.setValues = function(newValues) {
            values = newValues;
            templater.reload(item);
        };
        this.getValues = function() {
            return values;
        };
        this.show = function() {
            templater.show(item);
        };
        this.hide = function() {
            templater.hide(item);
        };
        init(initValues);
    };

    /* Templater with different kinds of template engines.
    * All engines have these methods
    * - reload(item)
    * - remove(item)
    */
    function Templater(settings) {

        this.standard = function(settings) {
            var listSource = helpers.getByClass(document.getElementById(settings.list), 'list')[0]
            , itemSource = document.getElementById(settings.item);

            this.reload = function(item) {
                var newItem = itemSource.cloneNode(true);
                newItem.id = "";
                for(var v in item.getValues()) {
                    helpers.getByClass(newItem, v)[0].innerHTML = item.getValues()[v];
                }
                if (typeof item.elm === "undefined") {
                    listSource.appendChild(newItem);
                } else {
                    listSource.replaceChild(newItem, item.elm);
                }
                item.elm = newItem;
            };
            this.add = function(item) {
                self.list.appendChild(item.elm);				
            } 
            this.remove = function(item) {
                listSource.removeChild(item.elm);
            };
            this.show = function(item) {
                item.elm.style.display = "block";
            };
            this.hide = function(item) {
                item.elm.style.display = "none";
            };
        };
        
        /* WIP */
        this.jquerytemplates = function(settings) {
            this.reload = function(item) {
                item.elm = $('#'+this.template).tmpl(item.getValues());
            };
            this.add = function(item, options) {
               if (effect) {
                    item.elm.hide();
                    self.list.append(item.elm);
                    item.elm[effect]();
                } else {	
                    self.list.appendChild(item.elm);				
                }
            };
            this.remove = function(item, options) {
                $(this.elm)[effect]($(this.elm).remove);	
            };
            this.show = function(item, options) {
                item.elm.style.display = "block";
            };
            this.hide = function(item, options) {
                item.elm.style.display = "none";
            };
        }

        if (typeof settings.engine === 'undefined') {
            settings.engine = "standard";
        } else {
            settings.engine = settings.engine.toLowerCase();
        }
        return new this[templates.engine](settings);
    }

    init(values, templates);
};

