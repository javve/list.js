var Item = require('./item')

module.exports = function (list) {
  var getChildren = function (parent) {
    var nodes = parent.childNodes,
      items = []
    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        items.push(nodes[i])
      }
    }
    return items
  }

  var parse = function (itemElements) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      var values = list.templater.get(itemElements[i], list.valueNames)
      list.items.push(new Item(values, { element: itemElements[i], template: list.template }))
    }
  }
  var parseAsync = function (itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50) // TODO: If < 100 items, what happens in IE etc?
    parse(itemsToIndex, valueNames)
    if (itemElements.length > 0) {
      setTimeout(function () {
        parseAsync(itemElements, valueNames)
      }, 1)
    } else {
      list.update()
      list.trigger('parseComplete')
    }
  }

  list.handlers.parseComplete = list.handlers.parseComplete || []

  return function () {
    var itemsToIndex = getChildren(list.list),
      valueNames = list.valueNames

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames)
    } else {
      parse(itemsToIndex, valueNames)
    }
  }
}
