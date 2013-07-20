/*global console, define, $ */
define(["jquery", "rsvp"], function($, RSVP) {
    'use strict';
    var mod = {

        /**
            @options:
                selector: The part of the html body to be replaced
        **/
        init: function(options) {
            this.headerInTransitionClassName = options.headerInTransitionClassName;
            this.headerOutTransitionClassName = options.headerOutTransitionClassName;
            this.headerContainer = $(options.headerSelector);
            this.container = $(options.selector);
            this.headerSelector = options.headerSelector;
            this.selector = options.selector;
            RSVP.EventTarget.mixin(this);
            $("a").on("click", $.proxy(mod.handleAnchor, mod));
        },

        handleAnchor: function(evt) {
            var anchor = $(evt.target),
                href   = "";
            evt.preventDefault();

            if (!anchor.is("a")) {
                return true;
            }

            href = anchor.attr("href");
            if (typeof href === 'string' && href.length < 1) {
                return true;
            }

            this.doNetworkCall(href);
        },

        doNetworkCall: function(url) {
            var oldContent = this.container.html();
            $.get(url).done($.proxy(function(response) {
                this.updateContainer(response);
                this.trigger("updated", {
                    oldContent: oldContent,
                    location: url
                });
            }, this));
        },

        updateContainer: function(response) {
            var bodyContent = '',
                headerContent = '',
                responseDom;

            responseDom = $("<div>").append(response);
            headerContent = responseDom.find(this.headerSelector);
            bodyContent = responseDom.find(this.selector);
            this.replaceHeaderContent(headerContent);
            this.replacePageContent(bodyContent);
        },

        replaceHeaderContent: function(contents) {
            this.headerContainer.on('animationend', $.proxy(function() {
                var oldContainer = this.headerContainer;
                oldContainer.replaceWith(contents);
                this.headerContainer = $(this.headerSelector);
                this.headerContainer.addClass(this.headerInTransitionClassName);
            }, this));
            this.headerContainer.addClass(this.headerOutTransitionClassName);
        },

        replacePageContent: function(contents) {
            this.container.on('animationend', $.proxy(function() {
                var oldContainer = this.container;
                oldContainer.replaceWith(contents);
                this.container = $(this.selector);
                this.container.addClass("slide-in");
            }, this));
            this.container.addClass("slide-out");
        }
    };

    return mod;
});