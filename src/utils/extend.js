/*
 * Source: https://github.com/segmentio/extend
 */

module.exports = function extend(object) {
  // Takes an unlimited number of extenders.
  const args = Array.prototype.slice.call(arguments, 1)

  // For each extender, copy their properties on our object.
  for (var i = 0, source; (source = args[i]); i++) {
    if (!source) continue
    for (const property in source) {
      object[property] = source[property]
    }
  }

  return object
}
