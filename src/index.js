const naturalSort = require('string-natural-compare')
const getByClass = require('./utils/get-by-class')
const extend = require('./utils/extend')
const indexOf = require('./utils/index-of')
const events = require('./utils/events')
const toString = require('./utils/to-string')
const classes = require('./utils/classes')
const getAttribute = require('./utils/get-attribute')
const toArray = require('./utils/to-array')

module.exports = function (id, options, values) {
  const self = this
  let init
  const Item = require('./item')(self)
  const addAsync = require('./add-async')(self)
  const initPagination = require('./pagination')(self)

  init = {
    start() {
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
        getByClass,
        extend,
        indexOf,
        events,
        toString,
        naturalSort,
        classes,
        getAttribute,
        toArray,
      }

      self.utils.extend(self, options)

      self.listContainer = typeof id === 'string' ? document.getElementById(id) : id
      if (!self.listContainer) {
        return
      }
      self.list = getByClass(self.listContainer, self.listClass, true)

      self.parse = require('./parse')(self)
      self.templater = require('./templater')(self)
      self.search = require('./search')(self)
      self.filter = require('./filter')(self)
      self.sort = require('./sort')(self)
      self.fuzzySearch = require('./fuzzy-search')(self, options.fuzzySearch)

      this.handlers()
      this.items()
      this.pagination()

      self.update()
    },
    handlers() {
      for (const handler in self.handlers) {
        if (self[handler] && self.handlers.hasOwnProperty(handler)) {
          self.on(handler, self[handler])
        }
      }
    },
    items() {
      self.parse(self.list)
      if (values !== undefined) {
        self.add(values)
      }
    },
    pagination() {
      if (options.pagination !== undefined) {
        if (options.pagination === true) {
          options.pagination = [{}]
        }
        if (options.pagination[0] === undefined) {
          options.pagination = [options.pagination]
        }
        for (let i = 0, il = options.pagination.length; i < il; i++) {
          initPagination(options.pagination[i])
        }
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
    const json = []
    for (let i = 0, il = self.items.length; i < il; i++) {
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
    const added = []
    let notCreate = false
    if (values[0] === undefined) {
      values = [values]
    }
    for (let i = 0, il = values.length; i < il; i++) {
      let item = null
      notCreate = self.items.length > self.page
      item = new Item(values[i], undefined, notCreate)
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
    let found = 0
    for (let i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i], options)
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
    const matchedItems = []
    for (let i = 0, il = self.items.length; i < il; i++) {
      const item = self.items[i]
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
    self.templater.clear()
    self.items = []
    return self
  }

  this.on = function (event, callback) {
    self.handlers[event].push(callback)
    return self
  }

  this.off = function (event, callback) {
    const e = self.handlers[event]
    const index = indexOf(e, callback)
    if (index > -1) {
      e.splice(index, 1)
    }
    return self
  }

  this.trigger = function (event) {
    let i = self.handlers[event].length
    while (i--) {
      self.handlers[event][i](self)
    }
    return self
  }

  this.reset = {
    filter() {
      const is = self.items
      let il = is.length
      while (il--) {
        is[il].filtered = false
      }
      return self
    },
    search() {
      const is = self.items
      let il = is.length
      while (il--) {
        is[il].found = false
      }
      return self
    },
  }

  this.update = function () {
    const is = self.items
    const il = is.length

    self.visibleItems = []
    self.matchingItems = []
    self.templater.clear()
    for (let i = 0; i < il; i++) {
      if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
        is[i].show()
        self.visibleItems.push(is[i])
        self.matchingItems.push(is[i])
      } else if (is[i].matching()) {
        self.matchingItems.push(is[i])
        is[i].hide()
      } else {
        is[i].hide()
      }
    }
    self.trigger('updated')
    return self
  }

  init.start()
}
