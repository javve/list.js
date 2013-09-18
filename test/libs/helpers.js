function fireKeyup(el) {
    if (document.createEvent) {
        if (window.KeyEvent) {
            var evObj = document.createEvent('KeyEvents');
            evObj.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
        } else {
            var evObj = document.createEvent('UIEvents');
            evObj.initUIEvent('keyup', true, true, window, 1);
        }
        el.dispatchEvent(evObj);
    } else if( document.createEventObject ) {
        fireOnThis.fireEvent('keyup');
    } else {
        // IE 5.0, seriously? :)
    }
}