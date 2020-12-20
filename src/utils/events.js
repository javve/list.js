const bind = window.addEventListener ? 'addEventListener' : 'attachEvent'
const unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent'
const prefix = bind !== 'addEventListener' ? 'on' : ''
const toArray = require('./to-array')

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.bind = function (el, type, fn, capture) {
  const elements = toArray(el)
  for (let i = 0, il = elements.length; i < il; i++) {
    elements[i][bind](prefix + type, fn, capture || false)
  }
}

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function (el, type, fn, capture) {
  const elements = toArray(el)
  for (let i = 0, il = elements.length; i < il; i++) {
    elements[i][unbind](prefix + type, fn, capture || false)
  }
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds. If `immediate` is true, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param {Function} fn
 * @param {Integer} wait
 * @param {Boolean} immediate
 * @api public
 */

exports.debounce = function (fn, wait, immediate) {
  let timeout
  return wait
    ? function () {
        const context = this
        const args = arguments
        const later = function () {
          timeout = null
          if (!immediate) fn.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) fn.apply(context, args)
      }
    : fn
}
