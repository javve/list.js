/**
 * A cross-browser implementation of getAttribute.
 * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
 *
 * Return the value for `attr` at `element`.
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */

module.exports = function (el, attr) {
  let result = (el.getAttribute && el.getAttribute(attr)) || null
  if (!result) {
    const attrs = el.attributes
    const { length } = attrs
    for (let i = 0; i < length; i++) {
      if (attrs[i] !== undefined) {
        if (attrs[i].nodeName === attr) {
          result = attrs[i].nodeValue
        }
      }
    }
  }
  return result
}
