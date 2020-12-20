module.exports = function (list) {
  let columns
  let searchString
  let customSearch

  const prepare = {
    resetList() {
      list.i = 1
      list.templater.clear()
      customSearch = undefined
    },
    setOptions(args) {
      if (args.length === 2 && args[1] instanceof Array) {
        columns = args[1]
      } else if (args.length === 2 && typeof args[1] === 'function') {
        columns = undefined
        customSearch = args[1]
      } else if (args.length === 3) {
        columns = args[1]
        customSearch = args[2]
      } else {
        columns = undefined
      }
    },
    setColumns() {
      if (list.items.length === 0) return
      if (columns === undefined) {
        columns = list.searchColumns === undefined ? prepare.toArray(list.items[0].values()) : list.searchColumns
      }
    },
    setSearchString(s) {
      s = list.utils.toString(s).toLowerCase()
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&') // Escape regular expression characters
      searchString = s
    },
    toArray(values) {
      const tmpColumn = []
      for (const name in values) {
        tmpColumn.push(name)
      }
      return tmpColumn
    },
  }
  const search = {
    list() {
      // Extract quoted phrases "word1 word2" from original searchString
      // searchString is converted to lowercase by List.js
      let words = []
      let phrase
      let ss = searchString
      while ((phrase = ss.match(/"([^"]+)"/)) !== null) {
        words.push(phrase[1])
        ss = ss.substring(0, phrase.index) + ss.substring(phrase.index + phrase[0].length)
      }
      // Get remaining space-separated words (if any)
      ss = ss.trim()
      if (ss.length) words = words.concat(ss.split(/\s+/))
      for (let k = 0, kl = list.items.length; k < kl; k++) {
        const item = list.items[k]
        item.found = false
        if (!words.length) continue
        for (let i = 0, il = words.length; i < il; i++) {
          var word_found = false
          for (let j = 0, jl = columns.length; j < jl; j++) {
            const column = columns[j]
            const values = item.values()
            if (values.hasOwnProperty(column) && values[column] !== undefined && values[column] !== null) {
              const text = typeof values[column] !== 'string' ? values[column].toString() : values[column]
              if (text.toLowerCase().indexOf(words[i]) !== -1) {
                // word found, so no need to check it against any other columns
                word_found = true
                break
              }
            }
          }
          // this word not found? no need to check any other words, the item cannot match
          if (!word_found) break
        }
        item.found = word_found
      }
    },
    // Removed search.item() and search.values()
    reset() {
      list.reset.search()
      list.searched = false
    },
  }

  const searchMethod = function (str) {
    list.trigger('searchStart')

    prepare.resetList()
    prepare.setSearchString(str)
    prepare.setOptions(arguments) // str, cols|searchFunction, searchFunction
    prepare.setColumns()

    if (searchString === '') {
      search.reset()
    } else {
      list.searched = true
      if (customSearch) {
        customSearch(searchString, columns)
      } else {
        search.list()
      }
    }

    list.update()
    list.trigger('searchComplete')
    return list.visibleItems
  }

  list.handlers.searchStart = list.handlers.searchStart || []
  list.handlers.searchComplete = list.handlers.searchComplete || []

  list.utils.events.bind(
    list.utils.getByClass(list.listContainer, list.searchClass),
    'keyup',
    list.utils.events.debounce(function (e) {
      const target = e.target || e.srcElement // IE have srcElement
      const alreadyCleared = target.value === '' && !list.searched
      if (!alreadyCleared) {
        // If oninput already have resetted the list, do nothing
        searchMethod(target.value)
      }
    }, list.searchDelay)
  )

  // Used to detect click on HTML5 clear button
  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'input', function (e) {
    const target = e.target || e.srcElement
    if (target.value === '') {
      searchMethod('')
    }
  })

  return searchMethod
}
