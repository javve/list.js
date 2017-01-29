const $ = require('jquery');

var fixturePagination = {
    list: function(valueNames) {
        var listHtml = $('<div id="list-pagination"><ul class="list"></ul><ul class="pagination"></ul></div>'),
            item = "";

        item = "<li>";
        for (var i = 0; i < valueNames.length; i++) {
            item += '<span class="'+valueNames[i]+'"</span>';
        }
        item += "</li>";

        $(document.body).append(listHtml);

        return item;
    },
    removeList: function() {
        $('#list-pagination').remove();
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
    },
    fredrik: {
        name: "Fredrik Martinsson",
        born: '1987'
    },
    jonas: {
        name: "Jonas Arnklint",
        born: '1987'
    },
    egon: {
        name: "Egon Östgren",
        born: '1983'
    },
    lars: {
        name: "Lars Larsson",
        born: '1992'
    },
    bertil: {
        name: "Bertil Cool",
        born: '1943'
    },
    ture: {
        name: "Ture Tur",
        born: '1965'
    },
    anders: {
        name: "Anders",
        born: '1987'
    },
    anna: {
        name: "Anna",
        born: '1987'
    },
    matilda: {
        name: "Matilda",
        born: '1983'
    },
    li: {
        name: "Li",
        born: '1992'
    },
    asa: {
        name: "Åsa",
        born: '1943'
    },
    gun: {
        name: "Gun",
        born: '1965'
    }
};
fixturePagination.all = [
    fixturePagination.jonny,
    fixturePagination.martina,
    fixturePagination.angelica,
    fixturePagination.sebastian,
    fixturePagination.imma,
    fixturePagination.hasse,
    fixturePagination.fredrik,
    fixturePagination.jonas,
    fixturePagination.egon,
    fixturePagination.lars,
    fixturePagination.bertil,
    fixturePagination.ture,
    fixturePagination.anders,
    fixturePagination.anna,
    fixturePagination.matilda,
    fixturePagination.li,
    fixturePagination.asa,
    fixturePagination.gun
];

module.exports = fixturePagination;
