/*global console, define, document, alert, history, window, $ */
define([], function() {
    'use strict';
    var kls = function TransitionManager(settings) {
        this.inClass = settings.inClass;
        this.outClass = settings.outClass;
    };

    kls.prototype.inClass = "";
    kls.prototype.outClass = "";
    kls.prototype.isAnimationRunning = false;

    kls.prototype.startTransition = function(container, newContents) {
        var dfd = new $.Deferred();
        container.one("animationstart", $.proxy(function() {
            this.isAnimationRunning = true;
        }, this));
        container.addClass(this.outClass);
        window.setTimeout($.proxy(function() {
            if (this.isAnimationRunning) {
                container.one('animationend', $.proxy(function() {
                    container.replaceWith(newContents);
                    container = $(container.selector);
                    container.addClass(this.inClass);
                    this.isAnimationRunning = false;
                    dfd.resolve();
                }, this));
            } else {
                container.replaceWith(newContents);
                container = $(container.selector);
                dfd.resolve();
            }
        }, this), 200);

        return dfd.promise();
    };

    return kls;
});
