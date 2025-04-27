var naturalSort = require('string-natural-compare')

module.exports = function (items, column, options) {
  options = options || {}
  var sortFunction = options.sortFunction || undefined
  var order = options.order || 'asc'
  var alphabet = options.alphabet || undefined
  var insensitive = options.insensitive !== undefined ? options.insensitive : true
  var caseSensitive = insensitive === false
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
    naturalSort.alphabet = alphabet
    items.sort(function (itemA, itemB) {
      var sortFunction = naturalSort.caseInsensitive
      if (!alphabet) {
        if (caseSensitive !== false) {
          sortFunction = naturalSort
        }
        return sortFunction('' + itemA.values()[column], '' + itemB.values()[column]) * multi
      } else {
        return sortFunction('' + itemA.values()[column], '' + itemB.values()[column])
      }
    })
    if (alphabet && order === 'desc') {
      items.reverse()
    }
    naturalSort.alphabet = ''
    return items
  }
}
