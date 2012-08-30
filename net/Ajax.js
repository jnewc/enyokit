/*
	Ajax Interface:
	
	// For making GET requests.
	Get(
		url,        (the request url)
		callbacks   (object with two properties as functions, onSuccess and onFailure)
		headers     (an array of header objects, each with the properties 'key' and 'value')
		qs          (a pre-formed query string - must be a string)
	);
	
	// For making POST requests.
	Post(
		url,
		callbacks,
		headers,
		body        (The full body of the request as a string)
	);
	
	>> For making multipart requests.
	Upload(
		url,
		callbacks
		formdata    (A FormData object)
*/

// TODO: Comments
enyo.kind({
	name: "Ajax",
	kind: "Component",
	
	statics: {
		Get: function(url, callbacks, headers, qs) {
			var req = new XMLHttpRequest(), i, qstr = qs || "";
			Ajax.SetCallbacks(req, callbacks);

			if(qstr !== "") { qstr = "?" + qstr; }
			req.open('GET', url + qstr);
			//Headers
			if(headers) {
				for(i = 0; i < headers.length; i++) {
					req.setRequestHeader(headers[i].key, headers[i].value);
				}
			}
			req.send(null);
		},
		Post: function(url, callbacks, headers, body) {
			var req = new XMLHttpRequest(), i;
			Ajax.SetCallbacks(req, callbacks);
			req.open('POST', url);
			var hasType = false;
			if(headers){ // Check that Content-type was set.
				for(i = 0; i < headers.length; i++) {
					var h = headers[i];
					if(h.key.toLowerCase()==="content-type"){hasType=true;}
				}
			}
			if(body && !hasType) { // If a Content-type wasn't set, default.
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			} 
			if(headers) {
				for(i = 0; i < headers.length; i++) {
					console.log("SETTING HEADER: " + JSON.stringify(headers[i]));
					req.setRequestHeader(headers[i].key, headers[i].value);
				}
			}
			if(body) { req.send(body); } 
			else { req.send(null); }
		},
		CreateQueryString: function(params) {
			var qstr = '', i;
			for (i = 0; i < params.length; i++) {
				if(i > 0) { qstr += '&'; }
				qstr += params[i].key + '=' + params[i].value;
			}
			return qstr;
		},
		SetCallbacks: function(req, cb) {
			req.onreadystatechange = function() {
				//AJAX REQUEST: COMPLETE
				console.log("AJAX RAW RESPONSE: " + req.responseText);
				if(Number(req.readyState) === 4) {
					//GENERIC SUCCESS
					if(req.status.toString().match(/^2\d\d$/) && cb.onSuccess) {
						cb.onSuccess(req);
					}
					//GENERIC FAILURE
					else if((req.status.toString().match(/^4\d\d$/) || req.status.toString().match(/^5\d\d$/)) && cb.onFailure) {
						cb.onFailure(req);
					}
					else if(Number(req.status) === 0) {
						//TODO: logging
						cb.onFailure(req);
					}
				}
				//TODO: add additional readystates
			};
		},
		
		// -------------------- Helper Methods -------------------- //
		QueryStringToParams: function(qs) {
			var pairs = qs.split("&"), i, 
				result = { error: false };
			for(i = 0; i < pairs.length; i++) {
				var tokens = pairs[i].split("=");
				result[tokens[0]] = tokens[1];
			}
			return result;
		},
		ParamsToQueryString: function(params) {
			var qstr = "", a;
			for(a in params){
				if(params.hasOwnProperty(a)){
					if(qstr !== "") { qstr += "&"; }
					qstr += a + "=" + params[a];
				}
			}
			return qstr;
		},
		ParamsToAuthHeader: function(params) {
			//TODO: Implement ParamsToAuthHeader
		},
		IsValidUrl: function(url) {
			// TODO: verify url regex is correct.
			return url.match(/^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9\-_%&\?\/\.=]+$/);
		}
	}
});