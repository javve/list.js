var templater = require('./templater')

module.exports = function (initValues, options) {
  var item = this

  this._values = {}

  this.found = false
  this.filtered = false

  var init = function (values, options) {
    options = options || {}
    var element = options.element
    var template = options.template
    if (element) item.elm = element
    if (!template) throw new Error('missing_item_template')
    item.template = template
    item.values(values)
  }

  this.values = function (newValues) {
    if (newValues !== undefined) {
      for (var name in newValues) {
        item._values[name] = newValues[name]
      }
      if (item.elm) {
        templater.set(item.elm, item.values(), item.template.valueNames)
      }
    } else {
      return item._values
    }
  }

  this.matching = function (options) {
    var searched = options.searched
    var filtered = options.filtered
    return (
      (filtered && searched && item.found && item.filtered) ||
      (filtered && !searched && item.filtered) ||
      (!filtered && searched && item.found) ||
      (!filtered && !searched)
    )
  }

  init(initValues, options)
}
