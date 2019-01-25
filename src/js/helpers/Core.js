'use strict';

const appVersion = (navigator.appVersion || '').toLowerCase(); 
const userAgent = (navigator.userAgent || '').toLowerCase();

export default {
    addEventListener: function(element, event, fn) {
        if(!element) {
            return;
        }
        if(document.attachEvent) {
            element.attachEvent("on" + event, fn);
        } else {
            element.addEventListener(event, fn);
        }
    },
    setAttr: function (element, attr) {
        if(!element) {
            this.console('setAttr : no element');
            return false;
        }
        for (var idx in attr) {
            if ((idx == 'styles' || idx == 'style') && typeof attr[idx] == 'object') {
                for (var prop in attr[idx]) {
                    element.style[prop] = attr[idx][prop];
                }
            } else if (idx == 'html') {
                element.innerHTML = attr[idx];
            } else {
                element.setAttribute(idx, attr[idx]);
            }
        }
    },
    addClass: function (element, className) {
        if(!element || !className) {
            this.console('addClass : no element or no classname');
            return false;
        }
        if (element.classList) {
            if(className.indexOf(' ') != -1) {
                var classes = className.split(' ');
                [].forEach.call(classes, function(value) {
                    element.classList.add(value);    
                });
            } else {
                element.classList.add(className);
            }
        } else if (!this.hasClass(element, className)) {
            element.className += ' ' + className;
        }
    },
    removeClass: function (element, className) {
        if(!element || !className) {
            this.console('removeClass : no element or no classname');
            return false;
        }
        if (element.classList) {
            if(className.indexOf(' ') != -1) {
                var classes = className.split(' ');
                [].forEach.call(classes, function(value) {
                    element.classList.remove(value);    
                });
            } else {
                element.classList.remove(className);
            }
        } else {
            element.className = element.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        }
    },
    hasClass: function (element, className) {
        if(!element) {
            this.console('hasClass : no element');
            return false;
        }
        return element.classList ? element.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(element.className);
    },
    toggleClass: function (element, className) {        
        if (!element || !className) {
            this.console('toggleClass : no element or no classname');
            return false;
        }
        this.hasClass(element, className) ? this.removeClass(element, className) : this.addClass(element, className);
    },
    getChildNode: function (element, selector) {
        if(!element) {
            this.console('getChiildNode : no element');
            return false;
        }
        var elements = [];
        (function loop(element) {
            var nodes = element.childNodes;
            for (var i = 0, length = nodes.length; i < length; i++) {
                var node = nodes[i];
                if (selector && node.nodeType === 1 && node.nodeName != "#text") {
                    if (node.matches(selector)) {
                        elements.push(node);
                    }
                    loop(node);
                }
            }
            return elements;
        })(element);
        return elements;
    },
    getParentNode: function (element, selector) {
        if(!element) {
            this.console('getParentNode : no element');
            return false;
        }
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }
        for ( ; element && element !== document; element = element.parentNode ) {
            if ( element.matches( selector ) ) return element;
        }
        return null;
    },
    getOffsetTop: function (element) {
        if (!element) {
            this.console('getOffsetTop : no element');
            return false;
        }
        var offsetTop = 0;
        do {
            if (!isNaN(element.offsetTop)) {
                offsetTop += element.offsetTop;
            }
        } while (element = element.offsetParent);
        return offsetTop;
    },
    getOffsetLeft: function (element) {
        if(!element) {
            this.console('getOffsetLeft : no element');
            return false;
        }
        var offsetLeft = 0;
        do {
            if (!isNaN(element.offsetLeft)) {
                offsetLeft += element.offsetLeft;
            }
        } while (element = element.offsetParent);
        return offsetLeft;
    },
    getUrlParam: function (url) {
        if(!url) {
            return false;
        }
        var urlObject = {};
        var pa = url.split('#');
        var urlStr = pa[0];
        if (pa) {
            urlObject.hash = pa[1];
        } else {
            urlObject.hash = null;
        }
        var userAgent = urlStr.split('?');
        var paramStr;
        if (userAgent.length < 2) {
            urlObject.url = urlStr;
            return urlObject;
        } else {
            urlObject.url = userAgent[0];
            paramStr = userAgent[1];
            for (var x = 2; x < userAgent.length; ++x) {
                paramStr += '?' + userAgent[x];
            }
        }
        var param = {};
        var pa = paramStr.split('&');
        var sa;
        var value;
        for (var i = 0; i < pa.length; ++i) {
            sa = pa[i].split('=');
            if (sa.length >= 2) {
                value = sa[1];
                for (var x = 2; x < sa.length; ++x) {
                    value += '=' + sa[x];
                }
                param[sa[0]] = value;
            }

        }
        urlObject.param = param;
        return urlObject;
    },
    getCookie: function(name) {
        if(!name) {
            return false;
        }
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    setCookie: function(name, value, option) {
        var expires = null;
        var path = null;
        var domain = null;
        var secure= false;
        if (option!== undefined) { 
            var expires = (option.expires!== undefined)? option.expires : null;
            if (String(typeof expires) == 'number') {
                var days =  new Date();
                days.setDate(days.getDate() + expires);
                expires=days;
            }
            var path = (option.path !== undefined) ? option.path : null;
            var domain = (option.domain !== undefined) ? option.domain : null;
            var secure = (option.secure !== undefined) ? option.secure : false;
        }
		document.cookie = name + "=" + escape(String(value)) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    },
    deleteCookie: function(name) {
        if(!name) {
            this.console('deleteCookie : no element');
            return false;
        }
        this.setCookie(name, '', -1);
    },
    getElementText: function(element) {
        if(!element) {
            this.console('getElementText : no element');
            return false;
        }
        return element.textContent || element.innerText;
    },
    setElementText: function(element, text) {
        if(!element) {
            this.console('setElementText : no element');
            return false;
        }
        if (element.textContent) {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    },
    getElementStyle: function(element) {
        if(!element) {
            this.console('getElementStyle : no element');
            return false;
        }
        return window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    },
    getElementSiblingsAll: function(element) {
        if(!element) {
            this.console('getElementSiblingsAll : no element');
            return false;
        }
        var parent = element.parentNode,
            siblings = [],
            sibling = parent.firstChild;
        for (; sibling; sibling = sibling.nextSibling) {
            if (sibling.nodeType !== 1 || sibling === element) {
                continue;
            }
            siblings.push(sibling);
        }
        return siblings;
    },
    getScrolled: function() {
        return (window.pageYOffset || document.documentElement.scrollTop) - (window.clientTop || 0);
    },
    extend: function(obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
    },
    isIE: function () {
        return (/msie/.test(userAgent) || /trident/.test(userAgent)) ? true : false;
    },
    isChrome: function () {
        return (/chrome/.test(userAgent)) ? true : false;
    },
    isSafari: function () {
        return (/safari/.test(userAgent)) ? true : false;
    },
    isFirefox: function () {
        return (/firefox/.test(userAgent)) ? true : false;
    },
    isMac: function () {
        return /mac/.test(appVersion);
    },
    isIphone: function () {
        return /iphone/.test(userAgent);
    },
    isIpad: function () {
        return /ipad/.test(userAgent);
    },
    isIpod: function () {
        return /ipod/.test(userAgent);
    },
    isIos: function () {
        return this.isIphone() || this.isIpad() || this.isIpod();
    },
    isAndroid: function () {
        return /android/.test(userAgent);
    },
    isBlackberry: function () {
        return (/blackberry/.test(userAgent) || /bb10/.test(userAgent)) ? true : false;
    },
    console: function(message) {
        if(window['console'] != 'undefined') {
            console.log(message);
        }
    }    
}