const fixtureFuzzysearch = {
  list: function (valueNames) {
    const listHtml = document.createElement('div')
    listHtml.id = 'list-fuzzy-search'
    listHtml.innerHTML = `
      <input class="fuzzy-search" />
      <ul class="list">
      </ul>
    `
    let item = ''

    item = '<li>'
    for (let i = 0; i < valueNames.length; i++) {
      item += `<span class="${valueNames[i]}"></span>`
    }
    item += '</li>'

    document.body.appendChild(listHtml)

    return item
  },
  removeList: function () {
    const listElement = document.getElementById('list-fuzzy-search')
    if (listElement) {
      listElement.remove()
    }
  },
  i1: { name: 'Guybrush Threepwood' },
  i2: { name: 'Manny Calavera' },
  i3: { name: 'Bernard Bernoulli' },
  i4: { name: 'LeChuck' },
  i5: { name: 'Elaine Marley-Threepwood' },
  i6: { name: 'Purple Tentacle' },
  i7: { name: 'Adrian Ripburger' },
  i8: { name: 'Bobbin Threadbare' },
  i9: { name: 'Murray the Demonic Skull' },
  i10: { name: 'Zak McKracken' },
}
fixtureFuzzysearch.all = [
  fixtureFuzzysearch.i1,
  fixtureFuzzysearch.i2,
  fixtureFuzzysearch.i3,
  fixtureFuzzysearch.i4,
  fixtureFuzzysearch.i5,
  fixtureFuzzysearch.i6,
  fixtureFuzzysearch.i7,
  fixtureFuzzysearch.i8,
  fixtureFuzzysearch.i9,
  fixtureFuzzysearch.i10,
]

export default fixtureFuzzysearch
