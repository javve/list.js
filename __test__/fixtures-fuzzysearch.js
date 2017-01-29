const $ = require('jquery');

var fixtureFuzzysearch = {
    list: function(valueNames) {
        var listHtml = $('<div id="list-fuzzy-search"><input class="fuzzy-search" /><ul class="list"></ul></div>'),
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
        $('#list-fuzzy-search').remove();
    },
    i1: { name: "Guybrush Threepwood" },
    i2: { name: "Manny Calavera" },
    i3: { name: "Bernard Bernoulli" },
    i4: { name: "LeChuck" },
    i5: { name: "Elaine Marley-Threepwood" },
    i6: { name: "Purple Tentacle" },
    i7: { name: "Adrian Ripburger" },
    i8: { name: "Bobbin Threadbare" },
    i9: { name: "Murray the Demonic Skull" },
    i10: { name: "Zak McKracken" }
};
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
    fixtureFuzzysearch.i10
];

module.exports = fixtureFuzzysearch;
