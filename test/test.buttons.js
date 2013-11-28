function fireKeyup(el) {
    if (document.createEvent) {
        var evObj;
        if (window.KeyEvent) {
            evObj = document.createEvent('KeyEvents');
            evObj.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
        } else {
            evObj = document.createEvent('UIEvents');
            evObj.initUIEvent('keyup', true, true, window, 1);
        }
        el.dispatchEvent(evObj);
    } else if( document.createEventObject ) {
        el.fireEvent('onkeyup');
    } else {
        // IE 5.0, seriously? :)
    }
}

// http://stackoverflow.com/questions/5658849/whats-the-equivalent-of-jquerys-trigger-method-without-jquery
function fireClick(el) {
    var evt;
    if (document.createEvent) {
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    (evt) ? el.dispatchEvent(evt) : (el.click && el.click());
}

describe('Button', function() {

    var list;

    beforeEach(function() {
        $('body').append($('<div id="parse-list">\
            <input class="search" />\
            <span class="sort" data-sort="name">Sort name</span>\
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

    describe('Sort', function() {
        it('should trigger sortStart', function(done) {
            list.on('sortComplete', function() {
                done();
            });
            fireClick($('#parse-list .sort')[0]);
        });
        it('should trigger sortComplete', function(done) {
            list.on('sortComplete', function() {
                done();
            });
            fireClick($('#parse-list .sort')[0]);
        });
    });

    describe('Search', function() {
        it('should trigger searchStart', function(done) {
            list.on('searchStart', function() {
                done();
            });
            $('#parse-list .search').val('jon');
            fireKeyup($('#parse-list .search')[0]);
        });
        it('should trigger searchComplete', function(done) {
            list.on('searchComplete', function() {
                done();
            });
            $('#parse-list .search').val('jon');
            fireKeyup($('#parse-list .search')[0]);
        });
    });
});
