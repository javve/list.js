const templater = require('./templater')

module.exports = function (initValues, { element, template } = {}) {
  var item = this

  this._values = {}

  this.found = false
  this.filtered = false

  var init = function (values, { element, template } = {}) {
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

  this.matching = function ({ searched, filtered }) {
    return (
      (filtered && searched && item.found && item.filtered) ||
      (filtered && !searched && item.filtered) ||
      (!filtered && searched && item.found) ||
      (!filtered && !searched)
    )
  }

  init(initValues, { element, template })
}
