export default function (el, parent) {
  if (!el) return false
  return el && el.parentNode == parent
}
