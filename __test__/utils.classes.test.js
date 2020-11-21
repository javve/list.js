const classes = require('../src/utils/classes')

describe('Classes', function () {
  var el

  beforeEach(function () {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(function () {
    document.body.removeChild(el)
  })

  it('should add', function () {
    classes(el).add('show')
    expect(el.getAttribute('class')).toBe('show')
  })
  it('should remove', function () {
    el.setAttribute('class', 'show')
    expect(el.getAttribute('class')).toBe('show')
    classes(el).remove('show')
    expect(el.getAttribute('class')).toBe('')
  })
  it('should toggle', function () {
    classes(el).toggle('show')
    expect(el.getAttribute('class')).toBe('show')
    classes(el).toggle('show')
    expect(el.getAttribute('class')).toBe('')
  })
  it('should array', function () {
    el.setAttribute('class', 'foo bar')
    expect(classes(el).array()).toEqual(['foo', 'bar'])
  })
  it('should has', function () {
    expect(classes(el).has('show')).toBe(false)
    el.setAttribute('class', 'show')
    expect(classes(el).has('show')).toBe(true)
  })
  it('should contains', function () {
    expect(classes(el).contains('show')).toBe(false)
    el.setAttribute('class', 'show')
    expect(classes(el).contains('show')).toBe(true)
  })
})
