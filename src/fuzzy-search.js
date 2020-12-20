const events = require('./utils/events')
const extend = require('./utils/extend')
const toString = require('./utils/to-string')
const getByClass = require('./utils/get-by-class')
const fuzzy = require('./utils/fuzzy')

module.exports = function (list, options) {
  options = extend(
    {
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true,
      searchClass: 'fuzzy-search',
    },
    options || {}
  )

  const fuzzySearch = {
    search(searchString, columns) {
      // Substract arguments from the searchString or put searchString as only argument
      const searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString]

      for (let k = 0, kl = list.items.length; k < kl; k++) {
        fuzzySearch.item(list.items[k], columns, searchArguments)
      }
    },
    item(item, columns, searchArguments) {
      let found = true
      const values = item.values()
      for (let i = 0, il = searchArguments.length; i < il; i++) {
        let foundArgument = false
        for (let j = 0, jl = columns.length; j < jl; j++) {
          if (fuzzySearch.values(values, columns[j], searchArguments[i])) {
            foundArgument = true
            break
          }
        }
        if (!foundArgument) {
          found = false
        }
      }
      item.found = found
    },
    values(values, value, searchArgument) {
      if (values.hasOwnProperty(value)) {
        const text = toString(values[value]).toLowerCase()

        if (fuzzy(text, searchArgument, options)) {
          return true
        }
      }
      return false
    },
  }

  events.bind(
    getByClass(list.listContainer, options.searchClass),
    'keyup',
    list.utils.events.debounce(function (e) {
      const target = e.target || e.srcElement // IE have srcElement
      list.search(target.value, fuzzySearch.search)
    }, list.searchDelay)
  )

  return function (str, columns) {
    list.search(str, columns, fuzzySearch.search)
  }
}
