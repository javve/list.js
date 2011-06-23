function List(id, templates, values) {
	var self = this;
	this.listContainer = $('#'+id);
	this.templates = templates;
	this.items = [];
	this.list = null;

	var init = function(values) {
		$('#'+self.templates.list).tmpl({}).appendTo(self.listContainer);
		self.list = $('.list', self.listContainer);
		$('.search', self.listContainer).keyup($.proxy(self.search, self));
		$('.sort', self.listContainer).click($.proxy(self.sort, self));
		//self.addExisting();
		self.add(values);
	};
	
	this.addExisting = function() {
		//$('.item',this.list)
	};
	
	/* Add object to list
	 * 
	 */
	this.add = function(values, effect, position) {
		var added = [];
		if (!$.isArray(values)){
			values = [values];
		}
		$(values).each(function(i) {
			var item = null;
			if (this instanceof Item) {
				item = this;
				item.reload();
			} else {
				item = new Item(this, self.templates.item);
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
	};
	
	/* Removes object from list. 
	 * Loops through the list and removes objects where
	 * property "valuename" === value
	 */
	this.remove = function(valueName, value, effect) {
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
	};
	
	/* Gets the objects in the list which 
	 * property "valueName" === value
	 */
	this.get = function(valueName, value) {
		var item = [];
		$(this.items).each(function(i) {
			if (this.values[valueName] === value) {
				item.push(this);
			}
		});
		return item;
	};
	
	/* Sorts the list 
	 * 
	 */
	this.sort = function(event, sortFunction) {
		var length = this.items.length,
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
				return sorter.alphanum(a.values[value], b.values[value]);
			};
		}
		this.items.sort(sortFunction);
		this.list.html("");
		$(this.items).each(function(i) {
			self.list.append(this.elm);
		});
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
	
	
	this.search = function(event, columns) {
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
	};
	
	this.filter = function(filterFunction) {
		$(this.items).each(function(i) {
			if (filterFunction(this.values)) {
				this.elm.show();
			} else {
				this.elm.hide();
			}
		});
	};
	
	this.reload = function() {
		$(this.items).each(function(i) {
			this.reload();
		});
	};
	
	var Item = function(values, template) {
		var item = this;
		
		var init = function(values, template) {
			item.template = template;
			item.setValues(values);
		};
		this.setValues = function(values) {
			item.values = values;
			item.reload();
		};
		this.reload = function() {
			item.elm = $('#'+this.template).tmpl(this.values);
		};
		init(values, template);
	};
	
	
	init(values);
};

