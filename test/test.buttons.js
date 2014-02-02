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
            <span class="sort" id="sort1" data-sort="name">Sort name</span>\
            <span class="sort" id="sort2" data-sort="name" data-order="asc">Sort name asc</span>\
            <span class="sort" id="sort3" data-sort="name" data-order="desc">Sort name desc</span>\
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
            fireClick($('#sort1')[0]);
        });
        it('should trigger sortComplete', function(done) {
            list.on('sortComplete', function() {
                done();
            });
            fireClick($('#sort1')[0]);
        });

        it('should switch sorting order when clicking multiple times', function(done) {
            this.timeout(5000);
            var sortRun = 0;
            list.on('sortComplete', function() {
                sortRun++;
                if (sortRun == 1) {
                    expect($('#sort1').hasClass('asc')).to.be(true);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    setTimeout(function() {
                        fireClick($('#sort1')[0]);
                    }, 50);
                } else if (sortRun == 2) {
                    expect($('#sort1').hasClass('asc')).to.be(false);
                    expect($('#sort1').hasClass('desc')).to.be(true);
                    setTimeout(function() {
                        fireClick($('#sort1')[0]);
                    }, 50);
                } else if (sortRun == 3) {
                    expect($('#sort1').hasClass('asc')).to.be(true);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    done();
                }
            });
            expect($('#sort1').hasClass('asc')).to.be(false);
            expect($('#sort1').hasClass('desc')).to.be(false);
            fireClick($('#sort1')[0]);
        });

        it('should sort with predefined order', function(done) {
            this.timeout(10000);
            var sortRun = 0;
            list.on('sortComplete', function() {
                sortRun++;
                if (sortRun == 1) {
                    expect($('#sort1').hasClass('asc')).to.be(false);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    expect($('#sort2').hasClass('asc')).to.be(true);
                    expect($('#sort2').hasClass('desc')).to.be(false);
                    expect($('#sort3').hasClass('asc')).to.be(false);
                    expect($('#sort3').hasClass('desc')).to.be(false);
                    setTimeout(function() {
                        fireClick($('#sort2')[0]);
                    }, 50);
                } else if (sortRun == 2) {
                    expect($('#sort1').hasClass('asc')).to.be(false);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    expect($('#sort2').hasClass('asc')).to.be(true);
                    expect($('#sort2').hasClass('desc')).to.be(false);
                    expect($('#sort3').hasClass('asc')).to.be(false);
                    expect($('#sort3').hasClass('desc')).to.be(false);
                    setTimeout(function() {
                        fireClick($('#sort2')[0]);
                    }, 50);
                } else if (sortRun == 3) {
                    expect($('#sort1').hasClass('asc')).to.be(false);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    expect($('#sort2').hasClass('asc')).to.be(true);
                    expect($('#sort2').hasClass('desc')).to.be(false);
                    expect($('#sort3').hasClass('asc')).to.be(false);
                    expect($('#sort3').hasClass('desc')).to.be(false);
                    setTimeout(function() {
                        fireClick($('#sort3')[0]);
                    }, 50);
                } else if (sortRun == 4) {
                    expect($('#sort1').hasClass('asc')).to.be(false);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    expect($('#sort2').hasClass('asc')).to.be(false);
                    expect($('#sort2').hasClass('desc')).to.be(false);
                    expect($('#sort3').hasClass('asc')).to.be(false);
                    expect($('#sort3').hasClass('desc')).to.be(true);
                    setTimeout(function() {
                        fireClick($('#sort3')[0]);
                    }, 50);
                } else if (sortRun == 5) {
                    expect($('#sort1').hasClass('asc')).to.be(false);
                    expect($('#sort1').hasClass('desc')).to.be(false);
                    expect($('#sort2').hasClass('asc')).to.be(false);
                    expect($('#sort2').hasClass('desc')).to.be(false);
                    expect($('#sort3').hasClass('asc')).to.be(false);
                    expect($('#sort3').hasClass('desc')).to.be(true);
                    done();
                }
            });
            expect($('#sort1').hasClass('asc')).to.be(false);
            expect($('#sort1').hasClass('desc')).to.be(false);
            expect($('#sort2').hasClass('asc')).to.be(false);
            expect($('#sort2').hasClass('desc')).to.be(false);
            expect($('#sort3').hasClass('asc')).to.be(false);
            expect($('#sort3').hasClass('desc')).to.be(false);
            fireClick($('#sort2')[0]);
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
