enyo.kind({
	name: "Ajax.Proxy",
	kind: "Component",
	
	statics: {
		Get: function(url, callbacks, headers, qs) {
			var req = new XMLHttpRequest(), i, qstr = qs || "";
			Ajax.SetCallbacks(req, callbacks);
			
			var _url    = "resources/php/twitter-proxy.php";
			var _body = JSON.stringify({
				url: url + (qs ? "?" + qs : ""),
				method: "GET",
				headers: headers
			});
			
			req.open('GET', _url + "?" + "json=" + encodeURIComponent(_body));
			req.send(null);
		},
		Post: function(url, callbacks, headers, body) {
			var req = new XMLHttpRequest(), i;
			Ajax.SetCallbacks(req, callbacks);
			
			var _url    = "resources/php/twitter-proxy.php";
			var _body = JSON.stringify({
				url: url,
				method: "POST",
				headers: headers,
				body: body
			});
			
			req.open('GET', _url + "?" + "json=" + encodeURIComponent(_body));
			req.send(null);
		},
		Upload: function(url, callbacks, formdata) {
			var req = new XMLHttpRequest(), i;
			Ajax.SetCallbacks(req, callbacks);
			
			var _url    = "/scorpio/resources/php/twitter-photo-upload.php";
			
			//formdata.append("testdata", "testing");
			formdata.append("url", url);
			
			req.open('POST', _url);
			//req.setRequestHeader("Content-type", "multipart/form-data");
			req.send(formdata);
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
				if(Number(req.readyState) === 4) {
					enyo.log("RAW RESPONSE: " + req.responseText);
					//GENERIC SUCCESS
					if(req.status.toString().match(/^2\d\d$/) && cb.onSuccess) {
						var resp;
						try {
							resp = JSON.parse(req.responseText);
						}
						catch(ex){
							cb.onFailure(req);
						}
						
						if(resp){ cb.onSuccess(resp); }
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

if(enyokit.config.useAjaxProxy) {
	window.Ajax = Ajax.Proxy;
}