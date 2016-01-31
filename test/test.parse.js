describe('Parse', function() {

  describe('Parse class', function() {
    var list;
    beforeEach(function() {
      $('body').append($('<div id="parse-list">\
        <div class="list">\
          <div><span class="name">Jonny</span><span class="born">1986</span></div>\
          <div><span class="name">Jocke</span><span class="born">1985</span></div>\
        </div>\
      </div>'));

      list = new List('parse-list', {
        valueNames: ['name', 'born']
      });
    });

    afterEach(function() {
      $('#parse-list').remove();
    });

    it('should have two items', function() {
      expect(list.items.length).to.equal(2);
      expect(list.items[0].values().name).to.equal("Jonny");
      expect(list.items[1].values().name).to.equal("Jocke");
    });
    it('should add item to parsed list', function() {
      list.add({ name: "Sven", born: 1950 });
      expect(list.items.length).to.equal(3);
      expect(list.items[0].values().name).to.equal("Jonny");
      expect(list.items[1].values().name).to.equal("Jocke");
      expect(list.items[2].values().name).to.equal("Sven");
      expect(list.items[0].values().born).to.equal("1986");
      expect(list.items[2].values().born).to.equal(1950);
      var el = $($('#parse-list').find('.list div')[2]);
      expect(el.find('span').size()).to.equal(2);
      expect(el.find('span.name').text()).to.equal('Sven');
      expect(el.find('span.born').text()).to.equal('1950');
    });
    it('should parsed value always be string while added could be number', function() {
      list.add({ name: "Sven", born: 1950 });
      expect(list.items[0].values().born).to.equal("1986");
      expect(list.items[0].values().born).not.to.equal(1986);
      expect(list.items[2].values().born).not.to.equal("1950");
      expect(list.items[2].values().born).to.equal(1950);
    });
  });

  describe('Parse data', function() {

    var list;

    beforeEach(function() {
      $('body').append($('<div id="parse-list">\
        <div class="list">\
          <div data-id="1"><a href="http://lol.com" class="link name">Jonny</a><span class="born">1986</span><img class="image" src="jonny.jpg"></div>\
          <div data-id="2"><a href="http://lol.com" class="link name">Jocke</a><span class="born">1985</span><img class="image" src="jocke.png"></div>\
        </div>\
      </div>'));

      list = new List('parse-list', {
        valueNames: ['name', 'born', { data: [ 'id' ] }, { attr: 'src', name: 'image'}, { attr: 'href', name: 'link'} ]
      });
    });

    afterEach(function() {
      $('#parse-list').remove();
    });

    it('should get values from class, data and src', function() {
      expect(list.items.length).to.equal(2);
      var jonny = list.items[0].values()
      expect(jonny.name).to.equal("Jonny");
      expect(jonny.born).to.equal("1986");
      expect(jonny.id).to.equal("1");
      expect(jonny.image).to.equal("jonny.jpg");
    });
    it('should add item to list with class, data and src', function() {
      list.add({ name: "Sven", born: 1950, id: 4, image: 'sven.gif', link: 'localhost' });
      expect(list.items.length).to.equal(3);
      var sven = list.items[2].values();
      expect(sven.name).to.equal("Sven");
      expect(sven.born).to.equal(1950);
      expect(sven.id).to.equal(4);
      expect(sven.image).to.equal("sven.gif");
      expect(sven.link).to.equal("localhost");
      var el = $($('#parse-list').find('.list div')[2]);
      expect(el.data('id')).to.equal(4);
      expect(el.find('.name').text()).to.equal('Sven');
      expect(el.find('.born').text()).to.equal('1950');
      expect(el.find('.image').attr('src')).to.equal('sven.gif');
      expect(el.find('.link').attr('href')).to.equal('localhost');
    });
  });
});
