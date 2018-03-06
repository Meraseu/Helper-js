window.Helperjs = (function (helperjs) {
	helperjs = function () {
		this.appVersion = (navigator.appVersion || '').toLowerCase();
		this.userAgent = (navigator.userAgent || '').toLowerCase();
	}
	helperjs.prototype = {
		setAttr: function (element, attr) {
			if(!element) {
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
			if(!element) {
				return false;
			}
			if (element.classList) {
				element.classList.add(className);
			} else if (!this.hasClass(element, className)) {
				element.className += ' ' + className;
			}
		},
		removeClass: function (element, className) {
			if(!element) {
				return false;
			}
			if (element.classList) {
				element.classList.remove(className);
			} else {
				element.className = element.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
			}
		},
		hasClass: function (element, className) {
			if(!element) {
				return false;
			}
			return element.classList ? element.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(element.className);
		},
		toggleClass: function (element, className) {
			if(!element) {
				return false;
			}
			if (!element || !className) {
				return false;
			}
			this.hasClass(element, className) ? this.removeClass(element, className) : this.addClass(element, className);
		},
		getChiildNode: function (element, selector) {
			if(!element) {
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
				return false;
			}
			var nodes = [];
			var element = element;
			while (element.parentNode) {
				var node = element.parentNode;
				if (selector) {
					if (node.matches(selector)) {
						nodes.unshift(node);
						break;
					}
				} else {
					nodes.unshift(node);
				}
				element = node;
			}
			return nodes;
		},
		getOffsetTop: function (element) {
			if (!element) {
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
		isIE: function () {
			return (/msie/.test(this.userAgent) || /trident/.test(this.userAgent)) ? true : false;
		},
		isChrome: function () {
			return (/chrome/.test(this.userAgent)) ? true : false;
		},
		isSafari: function () {
			return (/safari/.test(this.userAgent)) ? true : false;
		},
		isFirefox: function () {
			return (/firefox/.test(this.userAgent)) ? true : false;
		},
		isMac: function () {
			return /mac/.test(this.appVersion);
		},
		isIphone: function () {
			return /iphone/.test(this.userAgent);
		},
		isIpad: function () {
			return /ipad/.test(this.userAgent);
		},
		isIpod: function () {
			return /ipod/.test(this.userAgent);
		},
		isIos: function () {
			return this.isIphone() || this.isIpad() || this.isIpod();
		},
		isAndroid: function () {
			return /android/.test(this.userAgent);
		},
		isBlackberry: function () {
			return (/blackberry/.test(userAgent) || /bb10/.test(userAgent)) ? true : false;
		}
	}
	if (!(this instanceof helperjs)) {
		return new helperjs();
	}
})(window.helperjs || {});