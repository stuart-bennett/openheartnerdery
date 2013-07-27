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

require(['loader', 'transitionManager'], function(loader, TransitionManger) {
    'use strict';
    var headerTransition = new TransitionManger({ outClass: "squish", inClass: "expand" }),
        bodyTransition = new TransitionManger({ outClass: "slide-out", inClass: "slide-in" });
    loader.init({
        headerSelector              : "header.site-header p",
        selector                    : ".page-content",
        headerInTransitionClassName : "expand",
        headerOutTransitionClassName: "squish",
        headerTransitionManager     : headerTransition,
        bodyTransitionManager       : bodyTransition
    });
    loader.on('updated', function(args) {
        var newLocation = args.location;
        console.log(args.content);
        history.pushState({
            headerContent: args.headerContent,
            content: args.content
        }, newLocation, newLocation);
    });

    window.onpopstate = function(evt) {
        var state = evt.state;
        loader.replaceHeaderContent(state.headerContent);
        loader.replacePageContent(state.content);
    };
});