/*global $, require, Pjax, document, test, requirejs, console, alert */

requirejs.config({
    paths: {
        jquery: 'libs/jquery.min',
        pjax  : 'libs/pjax.min'
    },
    shim: {
        'jquery.pjax': {
            deps: ['jquery'],
            exports: 'jQuery.fn.pjax'
        }
    }
});

require(['loader'], function(loader) {
    'use strict';
    loader.init();
});