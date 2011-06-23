function List(id, templates, values) {
	var self = this;
	this.listContainer = document.getElementById(id);
	this.items = [];
	this.list = null;
	var templater = null;

	var helpers = {
		// http://www.dustindiaz.com/getelementsbyclass
		// d = node, e = class
		getByClass: function(d,e){if(d.getElementsByClassName){return d.getElementsByClassName(e)}else{return(function getElementsByClass(a,b){if(b==null)b=document;var c=[],els=b.getElementsByTagName("*"),elsLen=els.length,pattern=new RegExp("(^|\\s)"+a+"(\\s|$)"),i,j;for(i=0,j=0;i<elsLen;i++){if(pattern.test(els[i].className)){c[j]=els[i];j++}}return c})(e,d)}}
		/* http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/
		* // Example Usage
		* var lis = document.getElementsByTagName('li');
		* addEvent( lis, 'click', function() {
		*	this.style.border = '1px solid red';
		* });
		*/
		, addEvent: (function(e,f){if(f.addEventListener){return function(a,b,c){if((a&&!a.length)||a===e){a.addEventListener(b,c,false)}else if(a&&a.length){var d=a.length;for(var i=0;i<d;i++){helpers.addEvent(a[i],b,c)}}}}else if(f.attachEvent){return function(a,b,c){if((a&&!a.length)||a===e){a.attachEvent('on'+b,function(){return c.call(a,e.event)})}else if(a.length){var d=a.length;for(var i=0;i<d;i++){addEvent(a[i],b,c)}}}}})(this,document)
	};
	
	var init = function(values, templates) {
		//$('#'+self.templates.list).tmpl({}).appendTo(self.listContainer);
		templater = new Templater(templates);
		self.list = helpers.getByClass(self.listContainer, 'list')[0];
		helpers.addEvent(helpers.getByClass(self.listContainer, 'search'), 'keyup', self.search);
		helpers.addEvent(helpers.getByClass(self.listContainer, 'sort'), 'click', self.sort);
		//$('.search', self.listContainer).keyup($.proxy(self.search, self));
		//$('.sort', self.listContainer).click($.proxy(self.sort, self));
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
		/*
		if (!$.isArray(values)){
			values = [values];
		}*/
		for (var i = 0, il = values.length; i < il; i++) {
			var item = null;
			if (values[i] instanceof Item) {
				item = values[i];
				item.reload();
			} else {
				item = new Item(values[i]);
			}
			if (effect) {
				item.elm.hide();
				self.list.append(item.elm);
				item.elm[effect]();
			} else {	
				self.list.appendChild(item.elm);				
			}
			self.items.push(item);
			added.push(item);
		}
		return added;
	};
	
	/* Removes object from list. 
	 * Loops through the list and removes objects where
	 * property "valuename" === value
	 */
	this.remove = function(valueName, value, effect) {
		var found = false;
		for (var i = 0, il = self.items.length; i < il; i++) {
			if (self.items[i].values[valueName] === value) {
				templater.remove(self.items[i]);
				self.items.splice(i,1);
				found = true;
			}
		}
		return found;
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
	
	
	function Item(values) {
		var item = this;
		
		var init = function(values) {
			item.setValues(values);
		};
		this.setValues = function(values) {
			item.values = values;
			templater.reload(item);
		};
		this.reload = function() {
			//
		};
		init(values);
	};
	
	/* Templater with different kinds of template engines.
	 * All engines have these methods
	 * - reload(item)
	 * - remove(item)
	 */
	function Templater(templates) {
		
		this.standard = function(templates) {
			var listSource = document.getElementById(templates.list)
			, itemSource = document.getElementById(templates.item)
			, engine = templates.engine || "def";
			
			this.reload = function(item) {
				var newItem = itemSource.cloneNode(true);
				for(var v in item.values) {
		            helpers.getByClass(newItem, v)[0].innerHTML = item.values[v];
				}
				if (typeof item.elm === "undefined") {
					listSource.appendChild(newItem);
				} else {
					listSource.replaceChild(newItem, item.elm);
				}
				item.elm = newItem;
			}; 
			this.remove = function(item) {
				listSource.removeChild(item.elm);
			};
		} 
		
		this.jquerytemplates = function(templates) {
			this.reload = function(item) {
				item.elm = $('#'+this.template).tmpl(item.values);
			};
			this.remove = function() {
				$(this.elm)[effect]($(this.elm).remove);	
			};
		}
		
		if (typeof templates.engine === 'undefined') {
			templates.engine = "standard";
		} else {
			templates.engine = templates.engine.toLowerCase();
		}
		return new this[templates.engine](templates);
	}
	
	init(values, templates);
};

