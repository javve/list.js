var getByClass = require('./utils/get-by-class')
var getAttribute = require('./utils/get-attribute')

module.exports = function (list) {
  var createItem,
    templater = this

  var init = function () {
    var itemSource

    if (typeof list.item === 'function') {
      templater.createItem = function (values) {
        var item = list.item(values)
        return getItemSource(item)
      }
      return
    }

    if (typeof list.item === 'string') {
      if (list.item.indexOf('<') === -1) {
        itemSource = document.getElementById(list.item)
      } else {
        itemSource = getItemSource(list.item)
      }
    } else {
      /* If item source does not exists, use the first item in list as
      source for new items */
      itemSource = getFirstListItem()
    }

    if (!itemSource) {
      throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.")
    }

    itemSource = createCleanTemplateItem(itemSource, list.valueNames)

    templater.createItem = function () {
      return itemSource.cloneNode(true)
    }
  }

  var createCleanTemplateItem = function (templateNode, valueNames) {
    var el = templateNode.cloneNode(true)
    el.removeAttribute('id')

    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm = undefined,
        valueName = valueNames[i]
      if (valueName.data) {
        for (var j = 0, jl = valueName.data.length; j < jl; j++) {
          el.setAttribute('data-' + valueName.data[j], '')
        }
      } else if (valueName.attr && valueName.name) {
        elm = getByClass(el, valueName.name, true)
        if (elm) {
          elm.setAttribute(valueName.attr, '')
        }
      } else {
        elm = getByClass(el, valueName, true)
        if (elm) {
          elm.innerHTML = ''
        }
      }
    }
    return el
  }

  var getFirstListItem = function () {
    var nodes = list.list.childNodes

    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        return nodes[i].cloneNode(true)
      }
    }
    return undefined
  }

  var getItemSource = function (itemHTML) {
    if (typeof itemHTML !== 'string') return undefined
    if (/<tr[\s>]/g.exec(itemHTML)) {
      var tbody = document.createElement('tbody')
      tbody.innerHTML = itemHTML
      return tbody.firstElementChild
    } else if (itemHTML.indexOf('<') !== -1) {
      var div = document.createElement('div')
      div.innerHTML = itemHTML
      return div.firstElementChild
    }
    return undefined
  }

  var getValueName = function (name) {
    for (var i = 0, il = list.valueNames.length; i < il; i++) {
      var valueName = list.valueNames[i]
      if (valueName.data) {
        var data = valueName.data
        for (var j = 0, jl = data.length; j < jl; j++) {
          if (data[j] === name) {
            return { data: name }
          }
        }
      } else if (valueName.attr && valueName.name && valueName.name == name) {
        return valueName
      } else if (valueName === name) {
        return name
      }
    }
  }

  var setValue = function (el, name, value) {
    var elm = undefined,
      valueName = getValueName(name)
    if (!valueName) return
    if (valueName.data) {
      el.setAttribute('data-' + valueName.data, value)
    } else if (valueName.attr && valueName.name) {
      elm = getByClass(el, valueName.name, true)
      if (elm) {
        elm.setAttribute(valueName.attr, value)
      }
    } else {
      elm = getByClass(el, valueName, true)
      if (elm) {
        elm.innerHTML = value
      }
    }
  }

  this.get = function (el) {
    var valueNames = list.valueNames
    var values = {}
    for (var i = 0, il = valueNames.length; i < il; i++) {
      var valueName = valueNames[i]
      if (valueName.data) {
        for (var j = 0, jl = valueName.data.length; j < jl; j++) {
          values[valueName.data[j]] = getAttribute(el, 'data-' + valueName.data[j])
        }
      } else if (valueName.attr && valueName.name) {
        var elm = getByClass(el, valueName.name, true)
        values[valueName.name] = elm ? getAttribute(elm, valueName.attr) : ''
      } else {
        var elm = getByClass(el, valueName, true)
        values[valueName] = elm ? elm.innerHTML : ''
      }
    }
    return values
  }

  this.set = function (el, values) {
    for (var v in values) {
      if (values.hasOwnProperty(v)) {
        setValue(el, v, values[v])
      }
    }
  }

  this.create = function (values) {
    var elm = templater.createItem(values)
    templater.set(elm, values)
    return elm
  }
  this.remove = function (el) {
    if (el !== undefined && el.parentNode === list.list) {
      list.list.removeChild(el)
    }
  }
  this.show = function (el) {
    list.list.appendChild(el)
  }
  this.clear = function () {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1) {
        list.list.removeChild(list.list.firstChild)
      }
    }
  }

  init()
  return templater
}
