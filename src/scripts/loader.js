/*global console, define, document, alert, history, $ */
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
            this.headerTransitionManager = options.headerTransitionManager;
            this.bodyTransitionManager = options.bodyTransitionManager;
            RSVP.EventTarget.mixin(this);
            this.applyEvents();
            history.replaceState({
                headerContent: $("<div></div>").append(this.headerContainer.clone()).html(),
                content: $("<div></div>").append(this.container.clone()).html()
            }, document.location, document.location);
        },

        applyEvents: function(container) {
            if (!container) {
                $("a").on("click", $.proxy(this.handleAnchor, this));
            } else {
                $("a", container).on("click", $.proxy(this.handleAnchor, this));
            }
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

            this.updatePage(href).done($.proxy(function() {
                this.container = $(this.container.selector);
                this.headerContainer = $(this.headerContainer.selector);
                this.applyEvents(this.headerContainer);
                this.applyEvents(this.container);
                this.notifyPageUpdateWasSuccessful(href);
            }, this));
        },

        notifyPageUpdateWasSuccessful: function(hrefOfNewPage) {
            var content = '',
                headerContent = '';
            headerContent = $("<div></div>").append(this.headerContainer.clone()).html();
            content = $("<div></div>").append(this.container.clone()).html();
            this.trigger("updated", {
                content: content,
                headerContent: headerContent,
                location: hrefOfNewPage
            });
        },

        updatePage: function(url) {
            var dfd = new $.Deferred();
            $.get(url).done($.proxy(function(response) {
                this.updateContainer(response).done(function() { dfd.resolve(); });
            }, this));

            return dfd.promise();
        },

        updateContainer: function(response) {
            var bodyContent = '',
                headerContent = '',
                responseDom;

            responseDom = $("<div></div>").append(response);
            headerContent = responseDom.find(this.headerSelector);
            bodyContent = responseDom.find(this.selector);
            return $.when(this.replaceHeaderContent(headerContent), this.replacePageContent(bodyContent)).promise();
        },

        replaceHeaderContent: function(contents) {
            if (contents.length < 1) {
                contents = "<p></p>";
            }

            return this.headerTransitionManager.startTransition(this.headerContainer, contents);
        },

        replacePageContent: function(contents) {
            return this.bodyTransitionManager.startTransition(this.container, contents);
        }
    };

    return mod;
});