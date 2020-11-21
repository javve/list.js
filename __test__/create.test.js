const $ = require('jquery'),
  List = require('../src/index')

describe('Create', function () {
  describe('With HTML items', function () {
    var listEl = $(
      '<div id="list">\
      <ul class="list">\
        <li><span class="name">Jonny</span></li>\
      </ul>\
    </div>'
    )

    $(document.body).append(listEl)

    var list = new List('list', { valueNames: ['name'] })

    it('should contain one item', function () {
      expect(list.items.length).toEqual(1)
      expect(listEl.find('li').length).toEqual(1)
    })

    it('should contain two items', function () {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.find('li').length).toEqual(2)
    })

    listEl.remove()
  })

  describe('With and element instead of id', function () {
    var listEl = $(
      '<div id="list">\
      <ul class="list">\
        <li><span class="name">Jonny</span></li>\
      </ul>\
    </div>'
    )

    $(document.body).append(listEl)
    var el = document.getElementById('list')

    var list = new List(el, { valueNames: ['name'] })

    it('should contain one item', function () {
      expect(list.items.length).toEqual(1)
      expect(listEl.find('li').length).toEqual(1)
    })

    listEl.remove()
  })

  describe('Without items and with string template', function () {
    var listEl = $('<div id="list">\
      <ul class="list"></ul>\
    </div>')

    $(document.body).append(listEl)

    var list = new List(
      'list',
      {
        valueNames: ['name'],
        item: '<li><span class="name"></span></li>',
      },
      [{ name: 'Jonny' }]
    )

    it('should contain one item', function () {
      expect(list.items.length).toEqual(1)
      expect(listEl.find('li').length).toEqual(1)
    })

    it('should contain two items', function () {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.find('li').length).toEqual(2)
    })

    listEl.remove()
  })

  describe('Without items and with string template for table', function () {
    var listEl = $('<div id="list">\
      <table class="list"></table>\
    </div>')

    $(document.body).append(listEl)

    var list = new List(
      'list',
      {
        valueNames: ['name'],
        item: '<tr><span class="name"></span></tr>',
      },
      [{ name: 'Jonny' }]
    )

    it('should contain one item', function () {
      expect(list.items.length).toEqual(1)
      expect(listEl.find('tr').length).toEqual(1)
    })

    it('should contain two items', function () {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.find('tr').length).toEqual(2)
    })

    listEl.remove()
  })

  describe('Without items and with template function', function () {
    var listEl = $('<div id="list">\
      <ul class="list"></ul>\
    </div>')

    $(document.body).append(listEl)

    var list = new List(
      'list',
      {
        valueNames: ['name'],
        item: function (values) {
          return `<li data-template-fn-${values.name.toLowerCase()}><span class="name"></span></li>`
        },
      },
      [{ name: 'Jonny' }]
    )

    it('should contain one item', function () {
      expect(list.items.length).toEqual(1)
      expect(listEl.find('li').length).toEqual(1)
    })

    it('should contain two items', function () {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.find('li').length).toEqual(2)
    })

    it('should get values from items', function () {
      list.add({ name: 'Egon' })
      expect(listEl.find('li[data-template-fn-egon]').length).toEqual(1)
    })

    listEl.remove()
  })

  describe('without items and or template', function () {
    it('should throw error on init', function () {
      var listEl = $('<div id="list">\
        <ul class="list"></ul>\
      </div>')
      $(document.body).append(listEl)

      expect(function () {
        var list = new List('list', {
          valueNames: ['name'],
        })
      }).toThrow()
      listEl.remove()
    })
  })

  describe('Without items and with HTML template', function () {
    var listEl = $('<div id="list">\
      <ul class="list"></ul>\
    </div>')

    var templateEl = $('<li id="template-item"><span class="name"></span></li>')

    $(document.body).append(listEl)
    $(document.body).append(templateEl)

    var list = new List(
      'list',
      {
        valueNames: ['name'],
        item: 'template-item',
      },
      [{ name: 'Jonny' }]
    )

    it('should contain one item', function () {
      expect(list.items.length).toEqual(1)
      expect(listEl.find('li').length).toEqual(1)
    })

    it('should contain two items', function () {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.find('li').length).toEqual(2)
    })

    listEl.remove()
    templateEl.remove()
  })

  describe('Asyn index with existing list', function () {
    var listEl = $(
      '<div id="list">\
      <ul class="list">\
        <li><span class="name">Jonny</span></li><li><span class="name">Sven</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
        <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>\
        <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>\
        <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>\
        <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>\
        <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>\
        <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>\
        <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>\
        <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>\
        <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>\
        <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>\
      </ul>\
    </div>'
    )

    it('should contain one item', function (done) {
      $(document.body).append(listEl)
      var list = new List('list', {
        valueNames: ['name'],
        indexAsync: true,
        parseComplete: function (list) {
          expect(listEl.find('li').length).toEqual(162)
          listEl.remove()
          done()
        },
      })
    })
  })
})
