/* not finished */
List.prototype.templateEngines.jquerytemplate = function(settings) {
    var listSource = $('.list', document.getElementById(settings.list))
        , itemTemplate = $('#'+settings.item);
    
    /* Get values from element */
    this.get = function(item, valueNames) {
        throw "Not implemented";
    };
    
    /* Sets values at element */
    this.set = function(item, values) {
        item.elm = itemTemplate.tmpl(item.values());
    };
    
    this.create = function(item) {
        item.elm = itemTemplate.tmpl(item.values());
    };
    this.add = function(item, effect) { 
		if (effect) {
            item.elm.hide();
            listSource.append(item.elm);
            item.elm[effect]();
        } else {	
            listSource.append(item.elm);				
        }
    };
    this.remove = function(item, options) {
        $(item.elm)[effect]($(item.elm).remove);
    };
    this.show = function(item) {
        item.elm.style.display = "block";
    };
    this.hide = function(item) {
        item.elm.style.display = "none";
    };
};