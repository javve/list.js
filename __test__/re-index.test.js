const $ = require('jquery'),
  fixture = require('./fixtures');

describe('ReIndex', function() {

  var list, jonny, martina, angelica, sebastian, imma, hasse;

  beforeAll(function() {
    list = fixture.list(['name', 'born'], fixture.all);
  });

  afterAll(function() {
    fixture.removeList();
  });

  afterEach(function() {
    list.show(1, 200);
  });
  it('should return everyone born after 1988', function() {
    expect(list.toJSON()).toEqual([
      { name: "Jonny Strömberg", born: '1986' },
      { name: "Martina Elm", born: '1986' },
      { name: "Angelica Abraham", born: '1986' },
      { name: "Sebastian Höglund", born: '1989' },
      { name: "Imma Grafström", born: '1953' },
      { name: "Hasse Strömberg", born: '1955' }
    ]);
    var newHtml = '<li><span class="name">Sven</span><span class="born">2013</span>';
    newHtml = newHtml + '<li><span class="name">Anna</span><span class="born">3043</span>';
    $(list.list).html(newHtml);
    list.reIndex();
    expect(list.toJSON()).toEqual([
      { name: "Sven", born: '2013' },
      { name: "Anna", born: '3043' }
    ]);
  });
});
