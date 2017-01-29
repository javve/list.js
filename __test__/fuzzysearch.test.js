const $ = require('jquery'),
      fixtureFuzzysearch = require('./fixtures-fuzzysearch'),
      List = require('../src/index');

function fireKeyup(el) {
  if (document.createEvent) {
    var evObj;
    if (window.KeyEvent) {
      evObj = document.createEvent('KeyEvents');
      evObj.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
    } else {
      evObj = document.createEvent('UIEvents');
      evObj.initUIEvent('keyup', true, true, window, 1);
    }
    el.dispatchEvent(evObj);
  } else if( document.createEventObject ) {
    el.fireEvent('onkeyup');
  } else {
    // IE 5.0, seriously? :)
  }
}

describe('Fuzzy Search', function() {
  var list,
    itemHTML,
    pagination;

  beforeEach(function() {
    itemHTML = fixtureFuzzysearch.list(['name', 'born'])
    list = new List('list-fuzzy-search', {
      valueNames: ['name', 'born'],
      item: itemHTML
    }, fixtureFuzzysearch.all);
  });

  afterEach(function() {
    fixtureFuzzysearch.removeList();
  });

  it('should have default attribute', function() {
    expect(list.fuzzySearch).toBeInstanceOf(Function);
  });

  it('should find result', function() {
    list.fuzzySearch('guybrush');
    expect(list.matchingItems.length).toBe(1);
  });

  it('should find result', function() {
    list.fuzzySearch('g thre');
    expect(list.matchingItems.length).toBe(1);
  });

  it('should find result', function() {
    list.fuzzySearch('thre');
    expect(list.matchingItems.length).toBe(4);
  });

  describe('Search field', function() {

    it('should trigger searchStart', function(done) {
      list.on('searchStart', function() {
        done();
      });
      $('#list-fuzzy-search .fuzzy-search').val('angelica');
      fireKeyup($('#list-fuzzy-search .fuzzy-search')[0]);
    });

    it('should trigger searchComplete', function(done) {
      list.on('searchComplete', function() {
        done();
      });
      $('#list-fuzzy-search .fuzzy-search').val('angelica');
      fireKeyup($('#list-fuzzy-search .fuzzy-search')[0]);
    });

  });
});
