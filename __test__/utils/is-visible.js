module.exports = function (el, parent) {
  if (!el) return false
  return el && el.parentNode == parent
}
