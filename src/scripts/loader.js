/*global console, define, $ */
define(["jquery"], function($) {
    'use strict';
    var mod = {

        init: function() {
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
            $.get(url, $.proxy(this.updateContainer, this));
        },

        updateContainer: function(response) {
            var bodyContent = '';
            bodyContent = $(response).find(".wrapper").first();
            this.replacePageContent(bodyContent.html());
        },

        replacePageContent: function(contents) {
            $(".page-content").text(contents);
        }
    };

    return {
        init: mod.init
    };
});