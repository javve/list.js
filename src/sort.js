var naturalSort = require('string-natural-compare')

module.exports = (items, column, options = {}) => {
  const { sortFunction, order, alphabet, insensitive } = options
  const caseSensitive = insensitive !== false
  const multi = order === 'desc' ? -1 : 1

  if (sortFunction) {
    return items.sort(function (itemA, itemB) {
      return (
        sortFunction(itemA, itemB, {
          valueName: column,
          alphabet,
          caseSensitive,
        }) * multi
      )
    })
  } else {
    return items.sort(function (itemA, itemB) {
      const options = { alphabet }
      if (!alphabet) {
        if (caseSensitive) {
          options.caseInsensitive = true
        }
      }
      return naturalSort('' + itemA.values()[column], '' + itemB.values()[column], options) * multi
    })
  }
}
