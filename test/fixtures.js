var fixture = {
  list: function(valueNames, items) {
    var listHtml = $('<div id="list"><ul class="list"></ul></div>'),
      item = "";

    item = "<li>";
    for (var i = 0; i < valueNames.length; i++) {
      item += '<span class="'+valueNames[i]+'"</span>';
    }
    item += "</li>";

    $(document.body).append(listHtml);

    items = items || [];

    return new List('list', {
      valueNames: valueNames,
      item: item
    }, items);
  },
  removeList: function() {
    $('#list').remove();
  },
  jonny: {
    name: "Jonny Strömberg",
    born: '1986'
  },
  martina: {
    name: "Martina Elm",
    born: '1986'
  },
  angelica: {
    name: "Angelica Abraham",
    born: '1986'
  },
  sebastian: {
    name: "Sebastian Höglund",
    born: '1989'
  },
  imma: {
    name: "Imma Grafström",
    born: '1953'
  },
  hasse: {
    name: "Hasse Strömberg",
    born: '1955'
  }
};
fixture.all = [
  fixture.jonny,
  fixture.martina,
  fixture.angelica,
  fixture.sebastian,
  fixture.imma,
  fixture.hasse
];
