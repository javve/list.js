module.exports = function (list) {
  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || []
  list.handlers.filterComplete = list.handlers.filterComplete || []

  return function (filterFunction) {
    list.trigger('filterStart')
    list.i = 1 // Reset paging
    list.reset.filter()
    if (filterFunction === undefined) {
      list.filtered = false
    } else {
      list.filtered = true
      var is = list.items
      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i]
        if (filterFunction(item)) {
          item.filtered = true
        } else {
          item.filtered = false
        }
      }
    }
    list.update()
    list.trigger('filterComplete')
    return list.visibleItems
  }
}
