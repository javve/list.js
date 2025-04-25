var getByClass = require('./get-by-class')

var getDefinitionFromName = function (name, valueNames) {
  for (var i = 0, il = valueNames.length; i < il; i++) {
    var valueName = valueNames[i]
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
var set = function (el, name, value, valueNames) {
  var elm = undefined,
    valueName = getDefinitionFromName(name, valueNames)
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

module.exports = { getDefinitionFromName: getDefinitionFromName, set: set }
