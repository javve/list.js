const templater = require('./templater')

module.exports = function (list) {
  return function (initValues, element, notCreate) {
    var item = this

    this._values = {}

    this.found = false
    this.filtered = false

    var init = function (initValues, element, notCreate) {
      if (element === undefined) {
        if (notCreate) {
          item.values(initValues, notCreate)
        } else {
          item.values(initValues)
        }
      } else {
        item.elm = element
        item.values(initValues)
      }
    }

    this.values = function (newValues, notCreate) {
      if (newValues !== undefined) {
        for (var name in newValues) {
          item._values[name] = newValues[name]
        }
        if (item.elm) {
          templater.set(item.elm, item.values(), list.valueNames)
        }
      } else {
        return item._values
      }
    }

    this.matching = function ({ searched, filtered }) {
      return (
        (filtered && searched && item.found && item.filtered) ||
        (filtered && !searched && item.filtered) ||
        (!filtered && searched && item.found) ||
        (!filtered && !searched)
      )
    }

    init(initValues, element, notCreate)
  }
}
