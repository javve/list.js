List.prototype.templateEngines.jquerytemplates = function(settings) {
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
};