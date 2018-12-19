'use strict';

var helpers = require('./helpers.core');

module.exports = {
    attached: function(element) {
        helpers.addClass(element, 'attached');
        element.setAttribute('aria-hidden', 'false');
    },
    detached: function(element) {
        helpers.removeClass(element, 'attached');
        element.setAttribute('aria-hidden', 'true');
    }
}