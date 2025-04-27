import List from '../../src/index'

var fixture = {
  list: function (valueNames, items) {
    var listHtml = document.createElement('div')
    listHtml.id = 'list'
    var ul = document.createElement('ul')
    ul.className = 'list'
    listHtml.appendChild(ul)

    var item = '<li>'
    for (var i = 0; i < valueNames.length; i++) {
      item += '<span class="' + valueNames[i] + '"</span>'
    }
    item += '</li>'

    document.body.appendChild(listHtml)

    items = items || []

    return new List(
      'list',
      {
        valueNames: valueNames,
        item: item,
      },
      items
    )
  },
  removeList: function () {
    var list = document.getElementById('list')
    if (list) {
      list.remove()
    }
  },
  jonny: {
    name: 'Jonny Strömberg',
    born: '1986',
  },
  martina: {
    name: 'Martina Elm',
    born: '1986',
  },
  angelica: {
    name: 'Angelica Abraham',
    born: '1986',
  },
  sebastian: {
    name: 'Sebastian Höglund',
    born: '1989',
  },
  imma: {
    name: 'Imma Grafström',
    born: '1953',
  },
  hasse: {
    name: 'Hasse Strömberg',
    born: '1955',
  },
}
fixture.all = [fixture.jonny, fixture.martina, fixture.angelica, fixture.sebastian, fixture.imma, fixture.hasse]

module.exports = fixture
