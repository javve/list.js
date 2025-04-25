var naturalSort = require('string-natural-compare')

module.exports = function (items, column, options) {
  options = options || {}
  var sortFunction = options.sortFunction || undefined
  var order = options.order || 'asc'
  var alphabet = options.alphabet || undefined
  var insensitive = options.insensitive || false
  var caseSensitive = insensitive !== false
  var multi = order === 'desc' ? -1 : 1

  if (sortFunction) {
    return items.sort(function (itemA, itemB) {
      return (
        sortFunction(itemA, itemB, {
          valueName: column,
          alphabet: alphabet,
          caseSensitive: caseSensitive,
        }) * multi
      )
    })
  } else {
    return items.sort(function (itemA, itemB) {
      var options = { alphabet: alphabet }
      if (!alphabet) {
        if (caseSensitive) {
          options.caseInsensitive = true
        }
      }
      return naturalSort('' + itemA.values()[column], '' + itemB.values()[column], options) * multi
    })
  }
}
