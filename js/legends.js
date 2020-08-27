$(function () {
    "use strict";

    var $body = $(document.body),
        keys = window.$$legend.keys;

    $('.menu-item').on({
        'nav_focus': function () {
            keys.green('Перезагрузка')
        }
    });

        $('.menu-item').on({
        'nav_focus': function () {
            keys.red ('Выход')
        }
    });
	

});
