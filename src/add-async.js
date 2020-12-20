module.exports = function (list) {
  const addAsync = function (values, callback, items) {
    const valuesToAdd = values.splice(0, 50)
    const completedBatch = (items || []).concat(list.add(valuesToAdd))
    if (values.length > 0) {
      setTimeout(function () {
        addAsync(values, callback, completedBatch)
      }, 1)
    } else {
      list.update()
      callback(completedBatch)
    }
  }
  return addAsync
}
