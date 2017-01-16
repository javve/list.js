describe('Pagination', function() {
  describe('Default settings, innerWindow: 2, outerWindow: 0, left: 0, right: 0', function() {
    var list,
      itemHTML,
      pagination;

    before(function() {
      itemHTML = fixturePagination.list(['name'])
      list = new List('list-pagination', {
        valueNames: ['name'],
        item: itemHTML,
        page: 2,
        pagination: true
      }, fixturePagination.all);

      pagination = $('.pagination');
    });

    after(function() {
      fixturePagination.removeList();
    });

    it('should have default settings', function() {
      expect(pagination.find('a').size()).to.equal(4);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("3");
      expect(pagination.find('a').get(3).innerHTML).to.equal("...");
      expect(pagination.find('a').get(4)).to.equal(undefined);
    });

    it('should show same pages for show(7,2) and show(8,2)', function() {
      list.show(7, 2);
      expect(pagination.find('a').size()).to.equal(7);
      expect(pagination.find('a').get(0).innerHTML).to.equal("...");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("3");
      expect(pagination.find('a').get(3).innerHTML).to.equal("4");
      expect(pagination.find('a').get(4).innerHTML).to.equal("5");
      expect(pagination.find('a').get(5).innerHTML).to.equal("6");
      expect(pagination.find('a').get(6).innerHTML).to.equal("...");
      expect(pagination.find('a').get(7)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(false);
    });

    it('should show same pages for show(7,2) and show(8,2)', function() {
      list.show(8, 2);
      expect(pagination.find('a').size()).to.equal(7);
      expect(pagination.find('a').get(0).innerHTML).to.equal("...");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("3");
      expect(pagination.find('a').get(3).innerHTML).to.equal("4");
      expect(pagination.find('a').get(4).innerHTML).to.equal("5");
      expect(pagination.find('a').get(5).innerHTML).to.equal("6");
      expect(pagination.find('a').get(6).innerHTML).to.equal("...");
      expect(pagination.find('a').get(7)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(false);
    });

    it('should test show(14,2)', function() {
      list.show(14, 2);
      expect(pagination.find('a').size()).to.equal(6);
      expect(pagination.find('a').get(0).innerHTML).to.equal("...");
      expect(pagination.find('a').get(1).innerHTML).to.equal("5");
      expect(pagination.find('a').get(2).innerHTML).to.equal("6");
      expect(pagination.find('a').get(3).innerHTML).to.equal("7");
      expect(pagination.find('a').get(4).innerHTML).to.equal("8");
      expect(pagination.find('a').get(5).innerHTML).to.equal("9");
      expect(pagination.find('a').get(6)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(false);
    });

    it('should show last page with show(17,2)', function() {
      list.show(17, 2);
      expect(pagination.find('a').size()).to.equal(4);
      expect(pagination.find('a').get(0).innerHTML).to.equal("...");
      expect(pagination.find('a').get(1).innerHTML).to.equal("7");
      expect(pagination.find('a').get(2).innerHTML).to.equal("8");
      expect(pagination.find('a').get(3).innerHTML).to.equal("9");
      expect(pagination.find('a').get(4)).to.equal(undefined);
      expect($(pagination.find('li').get(1)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
    });
  });


  describe('Custom settings, innerWindow: 1, outerWindow: 1, left: 0, right: 0', function() {
    var list,
      itemHTML,
      pagination;

    before(function() {
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

    after(function() {
      fixturePagination.removeList();
    });

    it('should have default settings', function() {
      expect(pagination.find('a').size()).to.equal(4);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("...");
      expect(pagination.find('a').get(3).innerHTML).to.equal("9");
      expect(pagination.find('a').get(4)).to.equal(undefined);
    });

    it('should test show(7,2)', function() {
      list.show(7, 2);
      expect(pagination.find('a').size()).to.equal(7);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("...");
      expect(pagination.find('a').get(2).innerHTML).to.equal("3");
      expect(pagination.find('a').get(3).innerHTML).to.equal("4");
      expect(pagination.find('a').get(4).innerHTML).to.equal("5");
      expect(pagination.find('a').get(5).innerHTML).to.equal("...");
      expect(pagination.find('a').get(6).innerHTML).to.equal("9");
      expect(pagination.find('a').get(7)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(false);
    });

    it('should test show(14,2)', function() {
      list.show(14, 2);
      expect(pagination.find('a').size()).to.equal(6);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("...");
      expect(pagination.find('a').get(2).innerHTML).to.equal("6");
      expect(pagination.find('a').get(3).innerHTML).to.equal("7");
      expect(pagination.find('a').get(4).innerHTML).to.equal("8");
      expect(pagination.find('a').get(5).innerHTML).to.equal("9");
      expect(pagination.find('a').get(6)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(false);
    });

    it('should show last page with show(17,2)', function() {
      list.show(17, 2);
      expect(pagination.find('a').size()).to.equal(4);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("...");
      expect(pagination.find('a').get(2).innerHTML).to.equal("8");
      expect(pagination.find('a').get(3).innerHTML).to.equal("9");
      expect(pagination.find('a').get(4)).to.equal(undefined);
      expect($(pagination.find('li').get(1)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
    });

  });


  describe('Custom settings, innerWindow: 1, outerWindow: 1, left: 2, right: 1', function() {
    var list,
      itemHTML,
      pagination;

    before(function() {
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

    after(function() {
      fixturePagination.removeList();
    });

    it('should have default settings', function() {
      expect(pagination.find('a').size()).to.equal(4);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("...");
      expect(pagination.find('a').get(3).innerHTML).to.equal("9");
      expect(pagination.find('a').get(4)).to.equal(undefined);
    });

    it('should test show(7,2)', function() {
      list.show(7, 2);
      expect(pagination.find('a').size()).to.equal(7);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("3");
      expect(pagination.find('a').get(3).innerHTML).to.equal("4");
      expect(pagination.find('a').get(4).innerHTML).to.equal("5");
      expect(pagination.find('a').get(5).innerHTML).to.equal("...");
      expect(pagination.find('a').get(6).innerHTML).to.equal("9");
      expect(pagination.find('a').get(7)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(false);
    });

    it('should test show(12,2)', function() {
      list.show(12, 2);
      expect(pagination.find('a').size()).to.equal(8);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("...");
      expect(pagination.find('a').get(3).innerHTML).to.equal("5");
      expect(pagination.find('a').get(4).innerHTML).to.equal("6");
      expect(pagination.find('a').get(5).innerHTML).to.equal("7");
      expect(pagination.find('a').get(6).innerHTML).to.equal("...");
      expect(pagination.find('a').get(7).innerHTML).to.equal("9");
      expect(pagination.find('a').get(8)).to.equal(undefined);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(true);
      expect($(pagination.find('li').get(5)).hasClass('active')).to.equal(false);
    });

    it('should show last page with show(17,2)', function() {
      list.show(17, 2);
      expect(pagination.find('a').size()).to.equal(5);
      expect(pagination.find('a').get(0).innerHTML).to.equal("1");
      expect(pagination.find('a').get(1).innerHTML).to.equal("2");
      expect(pagination.find('a').get(2).innerHTML).to.equal("...");
      expect(pagination.find('a').get(3).innerHTML).to.equal("8");
      expect(pagination.find('a').get(4).innerHTML).to.equal("9");
      expect(pagination.find('a').get(5)).to.equal(undefined);
      expect($(pagination.find('li').get(2)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(3)).hasClass('active')).to.equal(false);
      expect($(pagination.find('li').get(4)).hasClass('active')).to.equal(true);
    });

  });
});
