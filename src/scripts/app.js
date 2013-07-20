/*global $, require, Pjax, window, history, document, test, requirejs, console, alert */

requirejs.config({
    paths: {
        jquery: 'libs/jquery.min',
        pjax  : 'libs/pjax.min',
        rsvp  : 'libs/rsvp.min'
    },
    shim: {
        'jquery.pjax': {
            deps: ['jquery'],
            exports: 'jQuery.fn.pjax'
        },
        'rsvp': {
            exports: 'RSVP'
        }
    }
});

require(['loader'], function(loader) {
    'use strict';
    loader.init({
        headerSelector              : "header.site-header p",
        selector                    : ".page-content",
        headerInTransitionClassName : "expand",
        headerOutTransitionClassName: "squish"
    });
    loader.on('updated', function(args) {
        var newLocation = args.location;
        history.pushState({ content: args.oldContent }, newLocation, newLocation);
        history.pushState({ content: args.oldContent }, newLocation, newLocation);
    });

    window.onpopstate = function(evt) {
        var state = evt.state;
        console.log(state);
        loader.replacePageContent(state.content);
    };
});