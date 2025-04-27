var getAttribute = require('./utils/get-attribute')
var classes = require('./utils/classes')
var events = require('./utils/events')
var sorter = require('./sort')

var getInSensitive = function (btn) {
  var insensitive = getAttribute(btn, 'data-insensitive')
  if (insensitive === 'false') {
    return false
  } else {
    return true
  }
}
var getNextSortOrder = function (btn) {
  var predefinedOrder = getAttribute(btn, 'data-order')
  if (predefinedOrder == 'asc' || predefinedOrder == 'desc') {
    return predefinedOrder
  } else if (classes(btn).has('desc')) {
    return 'asc'
  } else if (classes(btn).has('asc')) {
    return 'desc'
  } else {
    return 'asc'
  }
}
var clearSortOrder = function (els) {
  for (var i = 0, il = els.length; i < il; i++) {
    classes(els[i]).remove('asc')
    classes(els[i]).remove('desc')
  }
}
var setSortOrder = function (els, valueName, order) {
  for (var i = 0, il = els.length; i < il; i++) {
    var btn = els[i]
    if (getAttribute(btn, 'data-sort') !== valueName) {
      classes(btn).remove('asc')
      classes(btn).remove('desc')
      continue
    }
    var predefinedOrder = getAttribute(btn, 'data-order')
    if (predefinedOrder == 'asc' || predefinedOrder == 'desc') {
      if (predefinedOrder == order) {
        classes(btn).add(order)
        classes(btn).remove(order === 'asc' ? 'desc' : 'asc')
      } else {
        classes(btn).remove('asc')
        classes(btn).remove('desc')
      }
    } else {
      classes(btn).add(order)
      classes(btn).remove(order === 'asc' ? 'desc' : 'asc')
    }
  }
}

var addSortListeners = function (elements, options) {
  options = options || {}
  var items = options.items
  var sortFunction = options.sortFunction
  var alphabet = options.alphabet
  var before = options.before
  var after = options.after
  events.bind(elements, 'click', function () {
    if (before) before()
    var target = arguments[0].currentTarget || arguments[0].srcElement || undefined
    var valueName = getAttribute(target, 'data-sort')
    var order = getNextSortOrder(target)
    var insensitive = getInSensitive(target)
    var options = {
      sortFunction: sortFunction,
      insensitive: insensitive,
      alphabet: alphabet,
      order: order,
    }
    setSortOrder(elements, valueName, order)
    sorter(items, valueName, options)
    if (after) after()
  })
}

module.exports = {
  addSortListeners: addSortListeners,
  getInSensitive: getInSensitive,
  getNextSortOrder: getNextSortOrder,
  setSortOrder: setSortOrder,
  clearSortOrder: clearSortOrder,
}
