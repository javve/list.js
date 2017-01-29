const classes = require('../src/utils/classes');

describe('Classes', function() {

  beforeEach(function() {
    this.el = document.createElement('div')
    document.body.appendChild(this.el);
  });

  afterEach(function() {
    document.body.removeChild(this.el);
  });

  it('should add', function() {
    classes(this.el).add('show')
    expect(this.el.getAttribute('class')).toBe('show');
  });
  it('should remove', function() {
    this.el.setAttribute('class', 'show');
    expect(this.el.getAttribute('class')).toBe('show');
    classes(this.el).remove('show')
    expect(this.el.getAttribute('class')).toBe('');
  });
  it('should toggle', function() {
    classes(this.el).toggle('show')
    expect(this.el.getAttribute('class')).toBe('show');
    classes(this.el).toggle('show')
    expect(this.el.getAttribute('class')).toBe('');
  });
  it('should array', function() {
    this.el.setAttribute('class', 'foo bar');
    expect(classes(this.el).array()).toEqual(['foo','bar']);
  });
  it('should has', function() {
    expect(classes(this.el).has('show')).toBe(false);
    this.el.setAttribute('class', 'show');
    expect(classes(this.el).has('show')).toBe(true);
  });
  it('should contains', function() {
    expect(classes(this.el).contains('show')).toBe(false);
    this.el.setAttribute('class', 'show');
    expect(classes(this.el).contains('show')).toBe(true);
  });

});
