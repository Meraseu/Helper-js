;(function(onePiece) {

    onePiece.Helper = function() {
        this.appVersion = (navigator.appVersion || '').toLowerCase();
		this.userAgent = (navigator.userAgent || '').toLowerCase();
    }
    onePiece.Helper.prototype = {
		setAttr : function(element, attr) {
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
        addClass : function(element, className) {
			if(element.classList) {
				element.classList.add(className);
			} else if(!this.hasClass(element, className)) {
				element.className += ' ' + className;
			}
		},		
		removeClass : function(element, className) {
			if(element.classList) {
				element.classList.remove(className);
			} else {
				element.className = element.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
			}
		},
		hasClass : function(element, className) {
			return element.classList ? element.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(element.className);
		},
        toggleClass : function(element, className) {
			if(!element || !className) {
				return false;
			}
			this.hasClass(element, className) ? this.removeClass(element, className) : this.addClass(element, className);
		},
        getChiildNode : function(element, selector) {
			var elements = [];
			(function loop(element) {
				var nodes = element.childNodes;
				for(var i = 0, length = nodes.length; i < length; i++) {
					var node = nodes[i];
					if(selector && node.nodeType === 1 && node.nodeName != "#text") {
						if(node.matches(selector)) {
							elements.push(node);
						}
						loop(node);	
					}
				}
				return elements;
			})(element);
			return elements;
		},
		getParentNode : function(element, selector) {
            var nodes = [];
			var element = element;
			while(element.parentNode) {
				var node = element.parentNode;
				if(selector) {
					if(node.matches(selector)) {
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
		getOffsetTop : function(element) {
			if(!element) {
				return false;
			}
			var offsetTop = 0;
			do {
				if (!isNaN( element.offsetTop )) {
					offsetTop += element.offsetTop;
				}
			} while ( element = element.offsetParent );
			return offsetTop;
		},
		getOffsetLeft : function(element) {
			var offsetLeft = 0;
			do {
				if (!isNaN( element.offsetLeft )) {
					offsetLeft += element.offsetLeft;
				}
			} while ( element = element.offsetParent );
			return offsetLeft;
		}
    }

    onePiece.helper = new onePiece.Helper();

})(window.onePiece = window.onePiece || {});