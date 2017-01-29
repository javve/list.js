const $ = require('jquery'),
      fixturePagination = require('./fixtures-pagination'),
      List = require('../src/index');

describe('Pagination', function() {
  describe('Default settings, innerWindow: 2, outerWindow: 0, left: 0, right: 0', function() {
    var list,
      itemHTML,
      pagination;

    beforeAll(function() {
      itemHTML = fixturePagination.list(['name'])
      list = new List('list-pagination', {
        valueNames: ['name'],
        item: itemHTML,
        page: 2,
        pagination: true
      }, fixturePagination.all);

      pagination = $('.pagination');
    });

    afterAll(function() {
      fixturePagination.removeList();
    });

    it('should have default settings', function() {
      expect(pagination.find('a').size()).toEqual(4);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("3");
      expect(pagination.find('a').get(3).innerHTML).toEqual("...");
      expect(pagination.find('a').get(4)).toEqual(undefined);
    });

    it('should show same pages for show(7,2) and show(8,2)', function() {
      list.show(7, 2);
      expect(pagination.find('a').size()).toEqual(7);
      expect(pagination.find('a').get(0).innerHTML).toEqual("...");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("3");
      expect(pagination.find('a').get(3).innerHTML).toEqual("4");
      expect(pagination.find('a').get(4).innerHTML).toEqual("5");
      expect(pagination.find('a').get(5).innerHTML).toEqual("6");
      expect(pagination.find('a').get(6).innerHTML).toEqual("...");
      expect(pagination.find('a').get(7)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(false);
    });

    it('should show same pages for show(7,2) and show(8,2)', function() {
      list.show(8, 2);
      expect(pagination.find('a').size()).toEqual(7);
      expect(pagination.find('a').get(0).innerHTML).toEqual("...");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("3");
      expect(pagination.find('a').get(3).innerHTML).toEqual("4");
      expect(pagination.find('a').get(4).innerHTML).toEqual("5");
      expect(pagination.find('a').get(5).innerHTML).toEqual("6");
      expect(pagination.find('a').get(6).innerHTML).toEqual("...");
      expect(pagination.find('a').get(7)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(false);
    });

    it('should test show(14,2)', function() {
      list.show(14, 2);
      expect(pagination.find('a').size()).toEqual(6);
      expect(pagination.find('a').get(0).innerHTML).toEqual("...");
      expect(pagination.find('a').get(1).innerHTML).toEqual("5");
      expect(pagination.find('a').get(2).innerHTML).toEqual("6");
      expect(pagination.find('a').get(3).innerHTML).toEqual("7");
      expect(pagination.find('a').get(4).innerHTML).toEqual("8");
      expect(pagination.find('a').get(5).innerHTML).toEqual("9");
      expect(pagination.find('a').get(6)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(false);
    });

    it('should show last page with show(17,2)', function() {
      list.show(17, 2);
      expect(pagination.find('a').size()).toEqual(4);
      expect(pagination.find('a').get(0).innerHTML).toEqual("...");
      expect(pagination.find('a').get(1).innerHTML).toEqual("7");
      expect(pagination.find('a').get(2).innerHTML).toEqual("8");
      expect(pagination.find('a').get(3).innerHTML).toEqual("9");
      expect(pagination.find('a').get(4)).toEqual(undefined);
      expect($(pagination.find('li').get(1)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
    });
  });


  describe('Custom settings, innerWindow: 1, outerWindow: 1, left: 0, right: 0', function() {
    var list,
      itemHTML,
      pagination;

    beforeAll(function() {
      itemHTML = fixturePagination.list(['name'])
      list = new List('list-pagination', {
        valueNames: ['name'],
        item: itemHTML,
        page: 2,
        pagination: {
          innerWindow: 1,
          outerWindow: 1
        }
      }, fixturePagination.all);

      pagination = $('.pagination');
    });

    afterAll(function() {
      fixturePagination.removeList();
    });

    it('should have default settings', function() {
      expect(pagination.find('a').size()).toEqual(4);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("...");
      expect(pagination.find('a').get(3).innerHTML).toEqual("9");
      expect(pagination.find('a').get(4)).toEqual(undefined);
    });

    it('should test show(7,2)', function() {
      list.show(7, 2);
      expect(pagination.find('a').size()).toEqual(7);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("...");
      expect(pagination.find('a').get(2).innerHTML).toEqual("3");
      expect(pagination.find('a').get(3).innerHTML).toEqual("4");
      expect(pagination.find('a').get(4).innerHTML).toEqual("5");
      expect(pagination.find('a').get(5).innerHTML).toEqual("...");
      expect(pagination.find('a').get(6).innerHTML).toEqual("9");
      expect(pagination.find('a').get(7)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(false);
    });

    it('should test show(14,2)', function() {
      list.show(14, 2);
      expect(pagination.find('a').size()).toEqual(6);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("...");
      expect(pagination.find('a').get(2).innerHTML).toEqual("6");
      expect(pagination.find('a').get(3).innerHTML).toEqual("7");
      expect(pagination.find('a').get(4).innerHTML).toEqual("8");
      expect(pagination.find('a').get(5).innerHTML).toEqual("9");
      expect(pagination.find('a').get(6)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(false);
    });

    it('should show last page with show(17,2)', function() {
      list.show(17, 2);
      expect(pagination.find('a').size()).toEqual(4);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("...");
      expect(pagination.find('a').get(2).innerHTML).toEqual("8");
      expect(pagination.find('a').get(3).innerHTML).toEqual("9");
      expect(pagination.find('a').get(4)).toEqual(undefined);
      expect($(pagination.find('li').get(1)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
    });

  });


  describe('Custom settings, innerWindow: 1, outerWindow: 1, left: 2, right: 1', function() {
    var list,
      itemHTML,
      pagination;

    beforeAll(function() {
      itemHTML = fixturePagination.list(['name'])
      list = new List('list-pagination', {
        valueNames: ['name'],
        item: itemHTML,
        page: 2,
        pagination: {
          innerWindow: 1,
          outerWindow: 1,
          left: 2,
          right: 1
        }
      }, fixturePagination.all);

      pagination = $('.pagination');
    });

    afterAll(function() {
      fixturePagination.removeList();
    });

    it('should have default settings', function() {
      expect(pagination.find('a').size()).toEqual(4);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("...");
      expect(pagination.find('a').get(3).innerHTML).toEqual("9");
      expect(pagination.find('a').get(4)).toEqual(undefined);
    });

    it('should test show(7,2)', function() {
      list.show(7, 2);
      expect(pagination.find('a').size()).toEqual(7);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("3");
      expect(pagination.find('a').get(3).innerHTML).toEqual("4");
      expect(pagination.find('a').get(4).innerHTML).toEqual("5");
      expect(pagination.find('a').get(5).innerHTML).toEqual("...");
      expect(pagination.find('a').get(6).innerHTML).toEqual("9");
      expect(pagination.find('a').get(7)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(false);
    });

    it('should test show(12,2)', function() {
      list.show(12, 2);
      expect(pagination.find('a').size()).toEqual(8);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("...");
      expect(pagination.find('a').get(3).innerHTML).toEqual("5");
      expect(pagination.find('a').get(4).innerHTML).toEqual("6");
      expect(pagination.find('a').get(5).innerHTML).toEqual("7");
      expect(pagination.find('a').get(6).innerHTML).toEqual("...");
      expect(pagination.find('a').get(7).innerHTML).toEqual("9");
      expect(pagination.find('a').get(8)).toEqual(undefined);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(true);
      expect($(pagination.find('li').get(5)).hasClass('active')).toEqual(false);
    });

    it('should show last page with show(17,2)', function() {
      list.show(17, 2);
      expect(pagination.find('a').size()).toEqual(5);
      expect(pagination.find('a').get(0).innerHTML).toEqual("1");
      expect(pagination.find('a').get(1).innerHTML).toEqual("2");
      expect(pagination.find('a').get(2).innerHTML).toEqual("...");
      expect(pagination.find('a').get(3).innerHTML).toEqual("8");
      expect(pagination.find('a').get(4).innerHTML).toEqual("9");
      expect(pagination.find('a').get(5)).toEqual(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).toEqual(false);
      expect($(pagination.find('li').get(4)).hasClass('active')).toEqual(true);
    });

  });
});
