/**
 * A cross-browser implementation of getElementsByClass.
 * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
 *
 * Find all elements with class `className` inside `container`.
 * Use `single = true` to increase performance in older browsers
 * when only one element is needed.
 *
 * @param {String} className
 * @param {Element} container
 * @param {Boolean} single
 * @api public
 */

const getElementsByClassName = function (container, className, single) {
  if (single) {
    return container.getElementsByClassName(className)[0]
  }
  return container.getElementsByClassName(className)
}

const querySelector = function (container, className, single) {
  const selector = `.${className}`
  if (single) {
    return container.querySelector(selector)
  }
  return container.querySelectorAll(selector)
}

const polyfill = function (container, className, single) {
  const classElements = []
  const tag = '*'

  const els = container.getElementsByTagName(tag)
  const elsLen = els.length
  const pattern = new RegExp(`(^|\\s)${className}(\\s|$)`)
  for (let i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className)) {
      if (single) {
        return els[i]
      }
      classElements[j] = els[i]
      j++
    }
  }
  return classElements
}

module.exports = (function () {
  return function (container, className, single, options) {
    options = options || {}
    if ((options.test && options.getElementsByClassName) || (!options.test && document.getElementsByClassName)) {
      return getElementsByClassName(container, className, single)
    } else if ((options.test && options.querySelector) || (!options.test && document.querySelector)) {
      return querySelector(container, className, single)
    }
    return polyfill(container, className, single)
  }
})()
