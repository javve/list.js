module.exports = function (list) {
  const Item = require('./item')(list)

  const getChildren = function (parent) {
    const nodes = parent.childNodes
    const items = []
    for (let i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        items.push(nodes[i])
      }
    }
    return items
  }

  const parse = function (itemElements, valueNames) {
    for (let i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]))
    }
  }
  var parseAsync = function (itemElements, valueNames) {
    const itemsToIndex = itemElements.splice(0, 50) // TODO: If < 100 items, what happens in IE etc?
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
    const itemsToIndex = getChildren(list.list)
    const { valueNames } = list

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames)
    } else {
      parse(itemsToIndex, valueNames)
    }
  }
}
