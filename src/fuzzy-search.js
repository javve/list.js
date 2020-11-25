var classes = require('./utils/classes'),
  events = require('./utils/events'),
  extend = require('./utils/extend'),
  toString = require('./utils/to-string'),
  getByClass = require('./utils/get-by-class'),
  fuzzy = require('./utils/fuzzy')

module.exports = function (list, options) {
  options = options || {}

  options = extend(
    {
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true,
      searchClass: 'fuzzy-search',
    },
    options
  )

  var fuzzySearch = {
    search: function (searchString, columns) {
      // Substract arguments from the searchString or put searchString as only argument
      var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString]

      for (var k = 0, kl = list.items.length; k < kl; k++) {
        fuzzySearch.item(list.items[k], columns, searchArguments)
      }
    },
    item: function (item, columns, searchArguments) {
      var found = true
      for (var i = 0; i < searchArguments.length; i++) {
        var foundArgument = false
        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (fuzzySearch.values(item.values(), columns[j], searchArguments[i])) {
            foundArgument = true
          }
        }
        if (!foundArgument) {
          found = false
        }
      }
      item.found = found
    },
    values: function (values, value, searchArgument) {
      if (values.hasOwnProperty(value)) {
        var text = toString(values[value]).toLowerCase()

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
      var target = e.target || e.srcElement // IE have srcElement
      list.search(target.value, fuzzySearch.search)
    }, list.searchDelay)
  )

  return function (str, columns) {
    list.search(str, columns, fuzzySearch.search)
  }
}
