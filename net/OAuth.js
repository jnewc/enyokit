enyo.kind({
	name: "OAuth",
	kind: "Component",
	
	statics: {
		Call: function(inParams) {
			var bodyString = "", a, signature, i, authHeader, fd;
			// Create relevant parameters.
			var timeStamp = OAuthUtility.CreateTimeStamp();
			var nonce = OAuthUtility.CreateNonce(timeStamp);
			if(inParams.isUpload) { fd = new FormData(); }
			// Params for signature. (mandatory)
			var params = [
				{key:"oauth_consumer_key",     value: inParams.consumer_key },
				{key:"oauth_nonce",            value: nonce                 },
				{key:"oauth_signature_method", value: "HMAC-SHA1"           },
				{key:"oauth_timestamp",        value: timeStamp             },
				{key:"oauth_token",            value: HttpUtility.UrlEncode(inParams.oauth_token)  },
				{key:"oauth_version",          value: "1.0"                 }
			];
			// If extra flags, add to params
			if(inParams.flags && inParams.flags.length > 0){
				if(!inParams.isUpload) {
					// Sort params
					params = params.concat(inParams.flags);
					params.sort(function(a, b){
						var nameA = a.key.toLowerCase(), 
							nameB = b.key.toLowerCase(),
							valA  = a.value.toString().toLowerCase(),
							valB  = b.value.toString().toLowerCase();
						// Compare keys
						if (nameA < nameB) { return -1; } //sort string ascending
						if (nameA > nameB) { return 1; }
						// if same, compare vals
						if (valA < valB)   { return -1; }
						if (valA > valB)   { return 1; }
						// or same
						return 0; //default return value (no sorting)
					});
				}
				// Add params.
				for(i = 0; i < inParams.flags.length; i++){
					if(inParams.isUpload) {
						fd.append(inParams.flags[i].key, inParams.flags[i].value);
					} 
					else {
						var encflag = HttpUtility.UrlEncode(inParams.flags[i].value);
						params[inParams.flags[i].key] = encflag;
						bodyString += (bodyString.length>0?"&":"") + inParams.flags[i].key + "=" + encflag;
					}
				}
				
			}
			
			// Set signing endpoint.
			var endpoint = { url: inParams.url, method: inParams.method, responseFormat: inParams.responseFormat };
			var sign_endpoint = (inParams.fakeEndpoint ? 
				{ url: inParams.fakeEndpoint.url, method: inParams.fakeEndpoint.method, 
					responseFormat: inParams.responseFormat } : endpoint);
			
			// Create signature
			signature = OAuthUtility.GetSignature(
				sign_endpoint, params, 
				inParams.consumer_secret, inParams.oauth_token_secret
			);
			
			// Construct header
			authHeader = OAuthUtility.CreateAuthHeader(
				inParams.consumer_key, signature, 
				timeStamp, nonce, 
				inParams.realm || false, 
				inParams.authCallback || false,
				inParams.oauth_token || false
			);
			
			// Make request
			if(inParams.isUpload)  {
				OAuth.Upload(endpoint, inParams.fakeEndpoint, authHeader, 
					fd, inParams.callback, inParams.addHeaders);
			} 
			else {
				OAuth.Make(endpoint, authHeader, inParams.bodyString || bodyString, 
					inParams.callback, inParams.contentType || undefined, inParams.addHeaders || undefined);
			}
		},
		
		Make: function(endPoint, authHeader, body, callback, contentType, addHeaders){
			// Callbacks
			var respFormat = endPoint.responseFormat && endPoint.responseFormat.toLowerCase(), 
			cbSuccess = function(xhr) {
				if(endPoint.url.indexOf("instapaper") !== -1) {
					enyo.log("OAUTH SUCCESS RESPONSE RAW: " + xhr.responseText);
				}
				if(!endPoint.responseFormat || respFormat === "string"){
					callback({error:false, statusCode: xhr.status, result: xhr.responseText });
				} 
				else if(respFormat === "json" && xhr.responseText && xhr.responseText.length > 0) {
					callback({ error: false, statusCode: xhr.status, result: JSON.parse(xhr.responseText) });
				} else {
					// Default (TODO: make better?)
					callback({error:false, statusCode: xhr.status, result: xhr.responseText });
				}
			};
			var cbFailure = function(xhr) {
				enyo.log("OAUTH FAILURE RESPONSE RAW: " + xhr.responseText);
				callback({ error: true, statusCode: xhr.status, errorText: xhr.responseText });
			};
			
			var headers = [ authHeader ];
			if(contentType){
				headers.push({ key: "Content-type", value: contentType });
			}
			if(addHeaders && addHeaders.length > 0){
				headers = addHeaders.concat(headers);
			}
			//enyo.log("BODY: " + body);
			//enyo.log("REQUEST HEADERS: " + JSON.stringify(headers));
			// Request
			if(endPoint.method === "POST") {
				Ajax.Post(endPoint.url, { onSuccess: cbSuccess, onFailure: cbFailure }, headers, body);
			} else if(endPoint.method === "GET") {
				Ajax.Get(endPoint.url + (body===""?"":"?") + body, 
					{ onSuccess: cbSuccess, onFailure: cbFailure }, headers);
			}
		},
		
		Upload: function(endPoint, fakeEndpoint, authHeader, formdata, callback, addHeaders){
			var i, h, headers = [];
			console.log(JSON.stringify(authHeader));
			headers.push("X-Verify-Credentials-Authorization" + ": " + authHeader.value);
			headers.push("X-Auth-Service-Provider", fakeEndpoint.url);
			if(addHeaders) {
				for(i = 0; i < addHeaders.length; i++) {
					h = addHeaders[i];
					if(h.key && h.value) {
						headers.push(h.key + ": " + h.value);
					}
				}
			}
			formdata.append("headers", JSON.stringify(headers));
			
			Ajax.Upload(endPoint.url, {
				onSuccess: function(xhr) {
					console.log("OAUTH UPLOAD SUCCESS");
					callback(xhr);
				},
				onFailure: function(){}
			}, formdata);
		}
		
	}
});