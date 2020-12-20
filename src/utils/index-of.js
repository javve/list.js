const { indexOf } = []

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj)
  for (let i = 0, il = arr.length; i < il; ++i) {
    if (arr[i] === obj) return i
  }
  return -1
}
