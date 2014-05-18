var kitUtils = {
	debug: false,

	init: function () {
		if (typeof $('body').data('debug') === 'boolean' && $('body').data('debug') === true) {
			this.debug = true;
		}
		this.episerverIframeCheck();
	},

	isAndroid: function () {
		if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
			return true;
		} else {
			return false;
		}
	},

	isIOS: function () {
		if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
			return true;
		} else {
			return false;
		}
	},

	isBlackBerry: function () {
		if (navigator.userAgent.match(/BlackBerry/i)) {
			return true;
		} else {
			return false;
		}
	},

	isIEMobile: function () {
		if (navigator.userAgent.match(/IEMobile/i)) {
			return true;
		} else {
			return false;
		}
	},

	isOperaMini: function () {
		if (navigator.userAgent.match(/Opera Mini/i)) {
			return true;
		} else {
			return false;
		}
	},

	isMobileBrowser: function () {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
	},

	// Detects the IE version and adds a class with browser version to the HTML element
	detectIEVersion: function () {
		if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
			document.documentElement.className += ' ie6';
		} else if (navigator.appVersion.indexOf('MSIE 7.') != -1) {
			document.documentElement.className += ' ie7';
		} else if (navigator.appVersion.indexOf('MSIE 8.') != -1) {
			document.documentElement.className += ' ie8';
		} else if (navigator.appVersion.indexOf('MSIE 9.') != -1) {
			document.documentElement.className += ' ie9';
		} else if ( /*@cc_on!@*/ false && document.documentMode === 10) {
			document.documentElement.className += ' ie10';
		}
	},

	// Add class to body tag if page is in episerver edit mode
	episerverIframeCheck: function () {
		var isInIframe = (window.location !== window.parent.location) ? true : false;
		if (isInIframe) {
			$('body').addClass('episerver');
		}
	},

	// Adds class .last-child on all elements with :last-child. A fix for IE8
	lastChildFix: function () {
		if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
			$('*:last-child').addClass('last-child');
		}
	},

	log: function (message) {

		// Check if debug is enabled
		if (this.debug) {

			// Check for console
			if (window.console) {
				console.log(message);
			}
		}
	}
};