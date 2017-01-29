const getByClass = require('../src/utils/get-by-class');

describe('GetByClass', function() {

  beforeEach(function() {
    this.el = document.createElement('div')
    this.el.setAttribute('class', 'foo')
    document.body.appendChild(this.el);
  });

  afterEach(function() {
    document.body.removeChild(this.el);
  });

  it('should use getElementsByClassName', function() {
    expect(getByClass(document.body, 'foo', false, { test: true, getElementsByClassName: true}).length).toBe(1);
  });
  it('should use getElementsByClassName', function() {
    expect(getByClass(document.body, 'foo', false, { test: true, querySelector: true}).length).toBe(1);
  });
  it('should toggle', function() {
    expect(getByClass(document.body, 'foo', false, { test: true, polyfill: true}).length).toBe(1);
  });
});
