List.prototype.plugins.emptyView = function(locals, options) {
  var list = this;
  var emptyView = document.getElementById(options.emptyViewId);
  if(emptyView){
    var visibleDisplayType = options.visibleDisplayType || "block";
    var hiddenDisplayType = "none";
    list.on('updated', function(){
      if(list.visibleItems < 1)
      {
        emptyView.style.display = visibleDisplayType;
      }
      else
      {
        emptyView.style.display = hiddenDisplayType;
      }
    });
    list.update();
  }else{
    console.log("Could not find the emptyView")
  }
};
