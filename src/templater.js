var Templater = function(list) {
  var itemSource,
    templater = this;

  var init = function() {
    itemSource = getItemSource(list.item);
    if (itemSource) {
      itemSource = clearSourceItem(itemSource, list.valueNames);
    }
  };

  var clearSourceItem = function(el, valueNames) {
    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm = undefined,
        valueName = valueNames[i];
      if (valueName.data) {
        for (var j = 0, jl = valueName.data.length; j < jl; j++) {
          el.setAttribute("data-" + valueName.data[j], "");
        }
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(el, valueName.name, true);
        if (elm) {
          elm.setAttribute(valueName.attr, "");
        }
      } else {
        elm = list.utils.getByClass(el, valueName, true);
        if (elm) {
          elm.innerHTML = "";
        }
      }
    }
    return el;
  };

  var getItemSource = function(item) {
    if (item === undefined) {
      var nodes = list.list.childNodes,
        items = [];

      for (var i = 0, il = nodes.length; i < il; i++) {
        // Only textnodes have a data attribute
        if (nodes[i].data === undefined) {
          return nodes[i].cloneNode(true);
        }
      }
    } else if (/<tr[\s>]/g.exec(item)) {
      var tbody = document.createElement('tbody');
      tbody.innerHTML = item;
      return tbody.firstChild;
    } else if (item.indexOf("<") !== -1) {
      var div = document.createElement('div');
      div.innerHTML = item;
      return div.firstChild;
    } else {
      var source = document.getElementById(item);
      if (source) {
        return source;
      }
    }
    return undefined;
  };

  var getValueName = function(name) {
    for (var i = 0, il = list.valueNames.length; i < il; i++) {
      var valueName = list.valueNames[i];
      if (valueName.data) {
        var data = valueName.data;
        for (var j = 0, jl = data.length; j < jl; j++) {
          if (data[j] === name) {
            return { data: name };
          }
        }
      } else if (
        valueName.attr &&
        valueName.name &&
        valueName.name == name
      ) {
        return valueName;
      } else if (valueName === name) {
        return name;
      }
    }
  };

  var setValue = function(item, name, value) {
    var elm = undefined,
      valueName = getValueName(name);
    if (!valueName) return;
    if (valueName.data) {
      item.elm.setAttribute("data-" + valueName.data, value);
    } else if (valueName.attr && valueName.name) {
      elm = list.utils.getByClass(item.elm, valueName.name, true);
      if (elm) {
        elm.setAttribute(valueName.attr, value);
      }
    } else {
      elm = list.utils.getByClass(item.elm, valueName, true);
      if (elm) {
        elm.innerHTML = value;
      }
    }
  };

  this.get = function(item, valueNames) {
    templater.create(item);
    var values = {};
    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm = undefined,
        valueName = valueNames[i];
      if (valueName.data) {
        for (var j = 0, jl = valueName.data.length; j < jl; j++) {
          values[valueName.data[j]] = list.utils.getAttribute(
            item.elm,
            "data-" + valueName.data[j]
          );
        }
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);
        values[valueName.name] = elm
          ? list.utils.getAttribute(elm, valueName.attr)
          : "";
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);
        values[valueName] = elm ? elm.innerHTML : "";
      }
    }
    return values;
  };

  this.set = function(item, values) {
    if (!templater.create(item)) {
      for(var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(item, v, values[v]);
        }
      }
    }
  };

  this.create = function(item) {
    if (item.elm !== undefined) {
      return false;
    }
    if (itemSource === undefined) {
      throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");
    }
    /* If item source does not exists, use the first item in list as
    source for new items */
    var newItem = itemSource.cloneNode(true);
    newItem.removeAttribute('id');
    item.elm = newItem;
    templater.set(item, item.values());
    return true;
  };
  this.remove = function(item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };
  this.show = function(item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };
  this.hide = function(item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };
  this.clear = function() {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1)
      {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

module.exports = function(list) {
  return new Templater(list);
};
