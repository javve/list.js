var naturalSort = require('string-natural-compare'),
  getByClass = require('./utils/get-by-class'),
  extend = require('./utils/extend'),
  indexOf = require('./utils/index-of'),
  events = require('./utils/events'),
  toString = require('./utils/to-string'),
  classes = require('./utils/classes'),
  getAttribute = require('./utils/get-attribute'),
  toArray = require('./utils/to-array'),
  templater = require('./templater'),
  Item = require('./item'),
  sort = require('./sort'),
  { addSortListeners, clearSortOrder, setSortOrder } = require('./sort-buttons')

module.exports = function (id, options, values) {
  var self = this,
    init,
    addAsync = require('./add-async')(self),
    initPagination = require('./pagination')(self)

  init = {
    start: function () {
      self.listClass = 'list'
      self.searchClass = 'search'
      self.sortClass = 'sort'
      self.page = 10000
      self.i = 1
      self.items = []
      self.visibleItems = []
      self.matchingItems = []
      self.searched = false
      self.filtered = false
      self.searchColumns = undefined
      self.searchDelay = 0
      self.handlers = { updated: [] }
      self.valueNames = []
      self.utils = {
        getByClass: getByClass,
        extend: extend,
        indexOf: indexOf,
        events: events,
        toString: toString,
        naturalSort: naturalSort,
        classes: classes,
        getAttribute: getAttribute,
        toArray: toArray,
      }

      self.utils.extend(self, options)

      self.listContainer = typeof id === 'string' ? document.getElementById(id) : id
      if (!self.listContainer) {
        return
      }
      self.list = getByClass(self.listContainer, self.listClass, true)

      self.parse = require('./parse')(self)
      self.templater = templater
      self.template = self.templater.getTemplate({
        parentEl: self.list,
        valueNames: self.valueNames,
        template: self.item,
      })
      self.search = require('./search')(self)
      self.filter = require('./filter')(self)
      self.fuzzySearch = require('./fuzzy-search')(self, options.fuzzySearch)

      this.handlers()
      this.items()
      this.pagination()
      this.sort()

      self.update()
    },
    handlers: function () {
      for (var handler in self.handlers) {
        if (self[handler] && self.handlers.hasOwnProperty(handler)) {
          self.on(handler, self[handler])
        }
      }
    },
    items: function () {
      self.parse(self.list)
      if (values !== undefined) {
        self.add(values)
      }
    },
    pagination: function () {
      if (options.pagination !== undefined) {
        if (options.pagination === true) {
          options.pagination = [{}]
        }
        if (options.pagination[0] === undefined) {
          options.pagination = [options.pagination]
        }
        for (var i = 0, il = options.pagination.length; i < il; i++) {
          initPagination(options.pagination[i])
        }
      }
    },
    sort: function () {
      const sortButtons = self.utils.getByClass(self.listContainer, self.sortClass)
      const { items, sortFunction, alphabet } = self
      const before = function () {
        self.trigger('sortStart')
      }
      const after = function () {
        self.update()
        self.trigger('sortComplete')
      }
      addSortListeners(sortButtons, {
        items,
        sortFunction,
        alphabet,
        before,
        after,
      })

      self.handlers.sortStart = self.handlers.sortStart || []
      self.handlers.sortComplete = self.handlers.sortComplete || []
      self.on('searchStart', function () {
        clearSortOrder(sortButtons)
      })
      self.on('filterStart', function () {
        clearSortOrder(sortButtons)
      })
      self.sort = function (valueName, options = {}) {
        before()
        setSortOrder(sortButtons, valueName, options.order)
        options.alphabet = options.alphabet || self.alphabet
        options.sortFunction = options.sortFunction || self.sortFunction
        options.valueName = valueName
        sort(items, valueName, options)
        after()
        return items
      }
    },
  }

  /*
   * Re-parse the List, use if html have changed
   */
  this.reIndex = function () {
    self.items = []
    self.visibleItems = []
    self.matchingItems = []
    self.searched = false
    self.filtered = false
    self.parse(self.list)
  }

  this.toJSON = function () {
    var json = []
    for (var i = 0, il = self.items.length; i < il; i++) {
      json.push(self.items[i].values())
    }
    return json
  }

  /*
   * Add object to list
   */
  this.add = function (values, callback) {
    if (values.length === 0) {
      return
    }
    if (callback) {
      addAsync(values.slice(0), callback)
      return
    }
    var added = []
    if (values[0] === undefined) {
      values = [values]
    }
    for (var i = 0, il = values.length; i < il; i++) {
      var item = new Item(values[i], { template: self.template })
      self.items.push(item)
      added.push(item)
    }
    self.update()
    return added
  }

  this.show = function (i, page) {
    this.i = i
    this.page = page
    self.update()
    return self
  }

  /* Removes object from list.
   * Loops through the list and removes objects where
   * property "valuename" === value
   */
  this.remove = function (valueName, value, options) {
    var found = 0
    for (var i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i].elm, self.list)
        self.items.splice(i, 1)
        il--
        i--
        found++
      }
    }
    self.update()
    return found
  }

  /* Gets the objects in the list which
   * property "valueName" === value
   */
  this.get = function (valueName, value) {
    var matchedItems = []
    for (var i = 0, il = self.items.length; i < il; i++) {
      var item = self.items[i]
      if (item.values()[valueName] == value) {
        matchedItems.push(item)
      }
    }
    return matchedItems
  }

  /*
   * Get size of the list
   */
  this.size = function () {
    return self.items.length
  }

  /*
   * Removes all items from the list
   */
  this.clear = function () {
    self.templater.clear(self.list)
    self.items = []
    return self
  }

  this.on = function (event, callback) {
    self.handlers[event].push(callback)
    return self
  }

  this.off = function (event, callback) {
    var e = self.handlers[event]
    var index = indexOf(e, callback)
    if (index > -1) {
      e.splice(index, 1)
    }
    return self
  }

  this.trigger = function (event) {
    var i = self.handlers[event].length
    while (i--) {
      self.handlers[event][i](self)
    }
    return self
  }

  this.reset = {
    filter: function () {
      var is = self.items,
        il = is.length
      while (il--) {
        is[il].filtered = false
      }
      return self
    },
    search: function () {
      var is = self.items,
        il = is.length
      while (il--) {
        is[il].found = false
      }
      return self
    },
  }

  this.update = function () {
    var is = self.items,
      il = is.length

    self.visibleItems = []
    self.matchingItems = []
    self.templater.clear(self.list)
    for (var i = 0; i < il; i++) {
      if (is[i].matching(self) && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
        if (!is[i].elm) {
          is[i].elm = templater.create(is[i].values(), self.template)
        }
        templater.show(is[i].elm, self.list)
        self.visibleItems.push(is[i])
        self.matchingItems.push(is[i])
      } else if (is[i].matching(self)) {
        self.matchingItems.push(is[i])
        templater.remove(is[i].elm, self.list)
      } else {
        templater.remove(is[i].elm, self.list)
      }
    }
    self.trigger('updated')
    return self
  }

  init.start()
}
