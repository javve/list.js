var templates = {
	item: 'item'
	, list: 'list'
	, engine: 'jquery'
};

var values = [
	{ value1:"hej", value2:"hej2" }
	, { value1:"då", value2:"då2" }
	, { value1:"a", value2:12 }
	, { value1:"v", value2:3, value3:1 }
	, { value1:"b", value2:1, value3:1 }
	, { value1:"d", value2:43 }
	, { value1:"h", value2:234, value3:1337 }
	, { value1:"j", value2:11 }
	, { value1:"s", value2:1455 }
	, { value1:"3", value2:0 }
];


function List(id, templates, values) {
	this.listContainer = $('#'+id);
	this.templates = templates;
	this.items = [];
	this.list = null;
	this._init(values);
}

List.prototype = {
	_init: function(values) {
		$('#'+this.templates.list).tmpl({}).appendTo(this.listContainer);
		this.list = $('.list', this.listContainer);
		$('.search', this.listContainer).keyup($.proxy(this.search, this));
		$('.sort', this.listContainer).click($.proxy(this.sort, this));
		this.addExisting();
		this.add(values);
	},
	addExisting: function() {
		$('.item',this.list)
	},
	add: function(values, effect, position) {
		var self = this;
		var added = [];
		if (!$.isArray(values)){
			values = [values];
		}
		$(values).each(function(i) {
			var item = null;
			if (this instanceof self.Item) {
				item = this;
				item.reload();
			} else {
				item = new self.Item(this, self.templates.item);
			}
			if (effect) {
				item.elm.hide();
				self.list.append(item.elm);
				item.elm[effect]();
			} else {	
				self.list.append(item.elm);				
			}
			self.items.push(item);
			added.push(item);
		});
		return added;
	},
	remove: function(valueName, value, effect) {
		var self = this;
		$(this.items).each(function(i) {
			if (this.values[valueName] === value) {
				if (effect) {
					$(this.elm)[effect]($(this.elm).remove);
				} else {
					$(this.elm).remove();
				}
				self.items.splice(i,1);
				return true;
			}
		});
		return false;
	},
	get: function(valueName, value) {
		var item = [];
		$(this.items).each(function(i) {
			if (this.values[valueName] === value) {
				item.push(this);
			}
		});
		return item;
	},
	sort: function(event, sortFunction) {
		var self = this,
			length = this.items.length,
			value = null; 
		if (event.target === 'undefined') {
			value = event;
		} else {	
			value = $(event.target).attr('rel');
		}
		if (sortFunction) {
			sortFunction = sortFunction;
		} else {
			sortFunction = function(a, b) {
				return self._sorter._alphanum(a.values[value], b.values[value]);
			};
		}
		this.items.sort(sortFunction);
		this.list.html("");
		$(this.items).each(function(i) {
			self.list.append(this.elm);
		});
	},
	 var sorter = {
		_alphanum: function(a,b) {
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
			var aa = this._chunkify(a);
			var bb = this._chunkify(b);

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
		_chunkify: function(t) {
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
	},
	search: function(event, columns) {
		var searchString = '';
		if (typeof event.target !== 'undefined') {
			searchString = event.target.value.toLowerCase();
		} else {
			searchString = event;
		}
		var useAllColumns = false;
		if (typeof columns === 'undefined') {
			useAllColumns = true;
		}
		$(this.items).each(function(i) {
			var found = false;
			if (useAllColumns) {
				columns = this.values;
			}
			for(var j in columns) {
				var text = columns[j].toString().toLowerCase();
				if ((searchString !== "") && (text.search(searchString) > -1)) {
					found = true;
				}
			}
			if (found || (searchString === "")) {
				this.elm.show();
			} else {
				this.elm.hide();
			}
		});
	},
	filter: function(filterFunction) {
		$(this.items).each(function(i) {
			if (filterFunction(this.values)) {
				this.elm.show();
			} else {
				this.elm.hide();
			}
		});
	},
	reload: function() {
		$(this.items).each(function(i) {
			this.reload();
		});
	},
	Item: function(values, template) {
		this._init(values,template);
	}
};

List.prototype.Item.prototype = {
	_init: function(values, template) {
		this.template = template;
		this.setValues(values);
	},
	setValues: function(values) {
		this.values = values;
		this.reload();
	},
	reload: function() {
		this.elm = $('#'+this.template).tmpl(this.values);
	}
};

