const getByClass = require('../src/utils/get-by-class')

describe('GetByClass', function () {
  var el

  beforeEach(function () {
    el = document.createElement('div')
    el.setAttribute('class', 'foo')
    document.body.appendChild(el)
  })

  afterEach(function () {
    document.body.removeChild(el)
  })

  it('should use getElementsByClassName', function () {
    expect(getByClass(document.body, 'foo', false, { test: true, getElementsByClassName: true }).length).toBe(1)
  })
  it('should use getElementsByClassName', function () {
    expect(getByClass(document.body, 'foo', false, { test: true, querySelector: true }).length).toBe(1)
  })
  it('should toggle', function () {
    expect(getByClass(document.body, 'foo', false, { test: true, polyfill: true }).length).toBe(1)
  })
})
