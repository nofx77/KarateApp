/*
Arketype
Version 1.2.1
https://github.com/vincentlamoureux/Arketype
*/

// Arketype Object
if (!window.ark) window.ark = {};




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/* !-- Console fallback -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	// Constructor
	function ConsoleFallback() { }
	
	
	// Alerts the message instead of using the console
	var alertMessage = function(args) {
		var str = "";
		for ( var i = 0; i < args.length; i++ ) {
			str += args[i];
			if ( i < args.length - 1)
				str += "\n- - - - - - - - - - - - - - - - - - - - - -\n";
		}
		
		// Deactivated by default
		alert(str);
	};
	
	
	ConsoleFallback.prototype.log            = function() { alertMessage(arguments); };
	ConsoleFallback.prototype.warn           = function() { alertMessage(arguments); };
	ConsoleFallback.prototype.error          = function() { alertMessage(arguments); };
	ConsoleFallback.prototype.debug          = function() { alertMessage(arguments); };
	ConsoleFallback.prototype.group          = function() { alertMessage(arguments); };
	ConsoleFallback.prototype.groupEnd       = function() { alertMessage(arguments); };
	ConsoleFallback.prototype.groupCollapsed = function() { alertMessage(arguments); };
	
	// Adds the object
	if (!window.console)
		window.console = new ConsoleFallback();
	
}());




/* !-- Events -- */
/*
	ark.Events.add(obj, evt, func{, capture})    // Attaches an event listener to a given object. Will convert mouse events to touch events.
	ark.Events.preventDefault(evt)               // Prevents default actions for a given event.
	ark.Events.remove(obj, evt, func{, capture}) // Removes an event listener to a given object. Will convert mouse events to touch events.
	ark.Events.touchSupported()                  // Returns if the device supports touch events.
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	/* -- Constructor -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	function Events() {}
	
	
	
	
	/* -- Adds an event to an object -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Events.add = function(obj, evt, func, capture) {
		if ( typeof obj == "object" ) {
			if ( capture !== true ) capture = false;
			if ( obj.addEventListener )
				obj.addEventListener(convertMouseToTouchEvents(evt), func, capture);
			else if ( obj.attachEvent )
				obj.attachEvent("on" + convertMouseToTouchEvents(evt), func);
		}
	};
	
	
	
	
	/* -- Prevents default actions for a given event -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Events.preventDefault = function(evt) {
		var _evt = evt ? evt:window.event;
		
		if (_evt.preventDefault) {
			_evt.preventDefault();
		}
		
		_evt.returnValue = false;
		
		return false;
	};
	
	
	
	
	/* -- Removes an event from an object -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Events.remove = function(obj, evt, func, capture) {
		if ( typeof obj == "object" ) {
			if ( capture !== true ) capture = false;
			if ( obj.removeEventListener )
				obj.removeEventListener(convertMouseToTouchEvents(evt), func, capture);
			else if ( obj.detachEvent )
				obj.detachEvent("on" + convertMouseToTouchEvents(evt), func);
		}
	};
	
	
	
	
	/* -- Returns if touch events are supported -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Events.touchSupported = function() {
		return "ontouchstart" in window;
	};
	
	
	
	
	/* -- Convert mouse events to touch events -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	function convertMouseToTouchEvents(evt) {
		if ( (evt === "mouseup" || evt === "click") && Events.touchSupported() === true)
			evt = "touchend";
		else if (evt === "mousedown" && Events.touchSupported() === true)
			evt = "touchstart";
		else if (evt === "mousemove" && Events.touchSupported() === true)
			evt = "touchmove";
		
		return evt;
	}
	
	
	
	
	// Adds the object
	if (!window.ark) window.ark = {};
	
	if (!window.ark.Events)
		window.ark.Events = Events;
	
}());




/* !-- Device -- */
/*
	ark.Device.isMobile()              // Returns if the device is mobile.
	ark.Device.getPixelRatio()         // Returns the device pixel ratio.
	ark.Device.hasRetinaDisplay()      // Returns if the device has retina display.
	ark.Device.touchEventsSupported()  // Returns if the device supports touch events.
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	/* -- Constructor -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	function Device() {}
	
	
	
	
	/* -- Returns 'true' if device is mobile -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Device.isMobile = function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	};
	
	
	
	
	/* -- Returns the device pixel ratio -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Device.getPixelRatio = function() {
		return window.devicePixelRatio;
	};
	
	
	
	
	/* -- Returns 'true' if device has retina display -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Device.hasRetinaDisplay = function() {
		return window.devicePixelRatio > 1;
	};
	
	
	
	
	/* -- Returns 'true' if device supports touch events -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	Device.touchEventsSupported = function() {
		return "ontouchstart" in window;
	};
	
	
	
	
	// Adds the object
	if (!window.ark) window.ark = {};
	
	if (!window.ark.Device)
		window.ark.Device = Device;
	
})();




/* !-- Cookies -- */
/*
	ark.Cookies.get({cookieName})
	ark.Cookies.remove({cookieName}, path, domain)
	ark.Cookies.set(cookieName, cookieValue{, expires, path, domain})
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	// Constructor
	function Cookies() {}
	
	
	// Gets the requested cookie
	Cookies.get = function(cookieName) {
		var allCookies = {};
		
		var cookiesValues = document.cookie.split("; ");
		for ( var i = 0; i < cookiesValues.length; i++ ) {
			var key   = cookiesValues[i].split("=")[0];
			var value = window.unescape(cookiesValues[i].split("=")[1]);
			
			if (key) {
				allCookies[key] = value;
			}
		}
		
		if (cookieName) {
			return allCookies[cookieName];
		} else {
			return allCookies;
		}
	};
	
	
	// Remove the requested cookie
	Cookies.remove = function(cookieName, path, domain) {
		var allCookies = {};
		
		if ( cookieName )
			allCookies[cookieName] = "";
		else
			allCookies = Cookies.get();
		
		for ( var key in allCookies )
			Cookies.set(key, "", "-1y", path, domain);
	};
	
	
	// Expiration is a string with an integer that ends with a character ( d = days, m = months, y = years )
	Cookies.set = function(cookieName, cookieValue, expires, path, domain) {
		if ( cookieName ) {
			var strExpires = "";
			if (expires) {
				var duration = parseInt(expires.substring(0, expires.length - 1));
				var period = expires.substring(expires.length - 1).toLowerCase();
				
				if ( !isNaN(duration) && (period == "d" || period == "m" || period == "y" ) ) {
					var periodFunction;
					if ( period == "d" )
						periodFunction = "Date";
					else if ( period == "m" )
						periodFunction = "Month";
					else if ( period == "y" )
						periodFunction = "FullYear";
					
					var expirationDate = new Date();
					expirationDate["set" + periodFunction]( expirationDate["get" + periodFunction]() + duration );
					
					strExpires = "; expires=" + expirationDate.toGMTString();
				}
			}
			
			var strPath = "; path=" + (path ? path : "/");
			var strDomain = domain ? "; domain=" + domain : "";
			
			document.cookie = cookieName + "=" + escape(cookieValue) + strExpires + strPath + strDomain;
		}
	};
	
	
	// Adds the object
	if (!window.ark) window.ark = {};
	
	if (!window.ark.Cookies)
		window.ark.Cookies = Cookies;

}());




/* !-- Location Query -- */
/*
	ark.locationQuery['someUrlProperty']
	ark.LocationQuery.keyValuePairs()
	ark.LocationQuery.convertURL(url)
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	// Constructor
	function LocationQuery() {
		var _convertedURL = LocationQuery.convertURL(location.href);
		var _keyValuePairs = _convertedURL.keyValuePairs;
		
		// Creates a getter for each key found
		for ( var i in _convertedURL.properties ) {
			eval('this[i] = function(){ return "' + _convertedURL.properties[i] + '"; }');
		}
		
		// Returns all the key value pairs
		this.keyValuePairs = function() { return _keyValuePairs; };
	}
	
	
	// Converts into an object from a provided URL
	LocationQuery.convertURL = function() {
		var keyValuePairs = [];
		var properties    = {};
		
		var query = location.search.replace(/^\?/, "");
		
		if (query.length) {
			var pairs = query.split("&");
			var key, value;
			
			for ( var i = 0; i < pairs.length; i++ ) {
				key = pairs[i].substring(0, pairs[i].indexOf("="));
				value = pairs[i].substring(pairs[i].indexOf("=") + 1);
				
				keyValuePairs.push({ key: key, value: value });
				properties[key] = value;
			}
		}
		
		return { keyValuePairs: keyValuePairs, properties: properties };
	};
	
	
	// Adds the object
	if (!window.ark) window.ark = {};
	
	if (!window.ark.LocationQuery)
		window.ark.LocationQuery = LocationQuery;
	
	if (!window.ark.locationQuery)
		window.ark.locationQuery = new LocationQuery();
	
}());




/* !-- Locale -- */
/*
	ark.Locale.get()
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	// Constructor
	function Locale() { }
	
	
	// Returns the document locale
	Locale.get = function() {
		var locale = { lang: "en", country: null, iso: "en" },
			localeAttr = document.documentElement.lang;
		
		if (localeAttr) {
			localeAttr = localeAttr.split("-");
			
			if (localeAttr[0])
				locale.lang = localeAttr[0];
				
			if (localeAttr[1])
				locale.country = localeAttr[1].toUpperCase();
			
			if ( document.getElementById("ddl-countries-dev") )
				locale.country = document.getElementById("ddl-countries-dev").value;
		}
		
		locale.iso = locale.lang + (locale.country ? "-" + locale.country : "");
		
		return locale;
	};
	
	// Adds the object
	if (!window.ark) window.ark = {};
	
	if (!window.ark.Locale)
		window.ark.Locale = Locale;


}());




/* !-- Ajax -- */
/*
	(new ark.Ajax()).send(url, parserFunction {, responseMethod, method, data, sendMethod})
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	
	// Constructor
	function Ajax() {}
	
	
	// Handles the Ajax request
	function requestHandler(request, parserFunction, responseMethod, sendMethod) {
		var response = null;
		
		if ( request.readyState == 4 ) {
			var status = parseInt(request.status);
			
			if ( (status >= 200) && (status < 300) ) {
				if ( responseMethod == "XML" ) {
					for ( var cNodes = 0; cNodes < request.responseXML.childNodes.length; cNodes++) {
						var treeNode = request.responseXML.childNodes[cNodes];
						if (treeNode.nodeType == 1) {
							response = treeNode;
							cNodes = request.responseXML.childNodes.length;
						}
					}
				} else {
					if ( sendMethod == "JSON" ) {
						response = request.responseText ? eval("(" + request.responseText + ")") : null;
					} else
						response = request.responseText;
				}
			} else {
				response = { error: { errorCode: request.status, message: request.statusText, errorID: request.responseText } };
			}
			
			if ( parserFunction )
				parserFunction(response);
		}
	}
	
	
	// Sends the Ajax request
	Ajax.prototype.send = function(url, parserFunction, responseMethod, method, data, sendMethod, async) {
		if (responseMethod === null) responseMethod = "JSON";
		if (sendMethod === null) sendMethod = "JSON";
		
		if (method === null) method = "GET";
		
		var request = null;
		
		if ( window.XMLHttpRequest ) {
			request = new XMLHttpRequest();
		}
		
		if ( request ) {
			var obj = { ajax: this, request: request, parserFunction: parserFunction, responseMethod: responseMethod, sendMethod: sendMethod };
			
			request.onreadystatechange = function () { requestHandler(obj.request, obj.parserFunction, obj.responseMethod, obj.sendMethod); };
			
			// Cache busting URL
			url += ( url.indexOf("?") == -1 ? "?" : "&" ) + "cachebuster=" + (new Date()).getTime();
			
			request.open(method, url, async !== false ? true : false);
			if (request.setRequestHeader) {
				request.setRequestHeader("Content-type", responseMethod == "JSON" ? "application/json" : "application/x-www-form-urlencoded");
				if (sendMethod == "JSON")
					request.setRequestHeader("Accept", "application/json");
				else
					request.setRequestHeader("Accept", "text/plain");
			}
			
			request.send(responseMethod == "JSON" ? JSON.stringify(data) : data);
		}
	};
	
	
	// Adds the object
	if (!window.ark) window.ark = {};
	
	if (!window.ark.Ajax)
		window.ark.Ajax = Ajax;


}());




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */




/* !-- Empties an HTML element -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
window.ark.emptyElement = function() {
	for ( var el in arguments ) {
		if (arguments[el]) {
			while (arguments[el].firstChild)
				arguments[el].removeChild(arguments[el].firstChild);
		}
	}
};




/* !-- Trims the whitespaces at the beginning and the end of a string -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if ( !String.prototype.trim ) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "");
	};
}




/* !-- Shuffles the content of an array -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if ( !Array.prototype.shuffle ) {
	Array.prototype.shuffle = function() {
		for (var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
		return this;
	};
}




/* !-- Test methods for Storage (localStorage, sessionStorage) -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function(){
	if (!Storage.prototype.testLocalStorage) {
		var testStorage = function(__storage) {
			var enabled = true,
				testString = "__-__ARK-STORAGE-TEST__-__";
			
			try {
				__storage.setItem(testString, "true");
				__storage.removeItem(testString);
			} catch(e) {
				enabled = false;
			}
			
			return enabled;
		}
		
		Storage.prototype.testLocalStorage = function() {
			return testStorage(localStorage);
		};
		
		
		Storage.prototype.testSessionStorage = function() {
			return testStorage(sessionStorage);
		};
	}
})();




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */





/* !-- Arketype page load events -- */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
window.addEventListener("load", function() {
	// Adds a "loaded" class to the documentElement
	document.documentElement.classList.add("loaded");
});




document.addEventListener("DOMContentLoaded", function() {
	// Adds a "mobile" class to the documentElement
	if ( window.ark.Device.isMobile() ) {
		document.documentElement.classList.add("mobile");
	}
	
	
	
	
	/* -- Tries to activate menu items for the current page based on the body tag classes -- */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	(function(){
		var menuPrefixes = ["mn"], // body class "page-1" will match "prefix[i]_page-1"
			menuButtons = [],
			i, j, k;
		
		for ( i = 0; i < menuPrefixes.length; i++ ) {
			for ( j = 0; j < document.body.classList.length; j++ ) {
				menuButtons = document.querySelectorAll("." + menuPrefixes[i] + "_" + document.body.classList.item(j));
				for ( k = 0; k < menuButtons.length; k++ ) {
					menuButtons[k].classList.add("current");
				}
			}
		}
	})();
	
	
	
	
	/* Handles the Retina Display */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	(function(){
		if ( window.ark.Device.hasRetinaDisplay() ) {
			// Adds a retina class to the documentElement
			document.documentElement.classList.add("retina");
			
			// Replaces images that should to be replaced for retina ( with an "@1x" )
			var images = document.getElementsByTagName("img"),
				regexp = new RegExp("@1x", "gi");
				
			for ( var i = 0; i < images.length; i++ ) {
				if ( regexp.test(images[i].src) )
					images[i].src = images[i].src.replace(regexp, "@2x");
			}
		}
	})();
	
});
