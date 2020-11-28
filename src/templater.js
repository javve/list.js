var getByClass = require('./utils/get-by-class')
var getAttribute = require('./utils/get-attribute')
var valueNamesUtils = require('./utils/value-names')

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

var stringToDOMElement = function (itemHTML) {
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

var templater = {}

templater.getTemplate = function ({ valueNames, parentEl, template }) {
  if (typeof template === 'function') {
    return function (values) {
      var item = template(values)
      return stringToDOMElement(item)
    }
  }

  var itemSource
  if (typeof template === 'string') {
    if (template.indexOf('<') === -1) {
      itemSource = document.getElementById(template)
    } else {
      itemSource = stringToDOMElement(template)
    }
  } else {
    var nodes = parentEl.childNodes
    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        itemSource = nodes[i].cloneNode(true)
        break
      }
    }
  }
  if (!itemSource)
    throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.")

  itemSource = createCleanTemplateItem(itemSource, valueNames)

  return function () {
    return itemSource.cloneNode(true)
  }
}

templater.get = function (el, valueNames) {
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

templater.set = function (el, values, valueNames) {
  for (var v in values) {
    if (values.hasOwnProperty(v)) {
      valueNamesUtils.set(el, v, values[v], valueNames)
    }
  }
}

templater.create = function (values, valueNames, template) {
  var elm = template(values)
  templater.set(elm, values, valueNames)
  return elm
}
templater.remove = function (el, parentEl) {
  if (el !== undefined && el.parentNode === parentEl) {
    parentEl.removeChild(el)
  }
}
templater.show = function (el, parentEl) {
  parentEl.appendChild(el)
}
templater.clear = function (parentEl) {
  /* .innerHTML = ''; fucks up IE */
  if (parentEl.hasChildNodes()) {
    while (parentEl.childNodes.length >= 1) {
      parentEl.removeChild(parentEl.firstChild)
    }
  }
}

module.exports = templater
