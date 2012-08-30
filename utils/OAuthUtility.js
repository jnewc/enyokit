enyo.kind({
	name: "OAuthUtility",
	kind: "Component",
	
	statics: {
		// -------------------- Utilities -------------------- //
		CreateNonce: function(ts) {
			var arg = ts || (new Date()).getTime();
			return hex_sha1(arg);
		},
		CreateTimeStamp: function(_ts) {
			var ts = (_ts || ((new Date()).getTime() / 1000)).toString();
			if(ts.indexOf(".") !== -1) {
				ts = ts.split(".")[0];
			}
			return ts;
		},
		
		// -------------------- Signature Generation -------------------- //
		GetSignature: function(endpoint, params, consumerSecret, accessSecret) {
			if(!params) { params = []; }
			return OAuthUtility._getSignature(endpoint.method, endpoint.url, 
				params, consumerSecret, (accessSecret || undefined));
		},
		_getSignature: function(httpMethod, endpointUrl, params, consumerSecret, tokenSecret) {
			var baseStr = OAuthUtility.ConstructBaseString(httpMethod, endpointUrl, params);
			//Note: might want to log the sig string here if errors crop up.
			enyo.log("BASE STRING: " + baseStr);
			return OAuthUtility.EncodeSignature(
				baseStr,
				consumerSecret, //sig.urlEncode(consumerSecret), 
				tokenSecret     //sig.urlEncode(tokenSecret)
			);
		},
		EncodeSignature: function(baseString, consumerSecret, tokenSecret) {
			//NOTE: This relies on the HMAC-SHA1 (Base64 Encoded) methods from
			//      Paj's 'JavaScript implementation of the Secure Hash Algorithm, SHA-1
			// REMEMBER: tokenSecret may not be present (e.g. request token endpoints).
			return b64_hmac_sha1(consumerSecret + "&" + (tokenSecret||""), baseString);
		},
		ConstructBaseString: function(httpMethod, endpointUrl, params) {
			//Get encoded parts
			var enc_url = HttpUtility.UrlEncode(endpointUrl);
			var enc_params = (params.length !== undefined ? 
				HttpUtility.ParamsEncodeArray(params) :
				HttpUtility.ParamsEncode(params)
			);
			//Check arguments - ERROR checking.
			if((httpMethod !== "GET" && httpMethod !== "POST") || !enc_url || !enc_params) { return false; }
			//Return signed request
			var ret = httpMethod + "&" + enc_url + "&" + enc_params;
			return ret;
		},
		
		// -------------------- Header Construction -------------------- //
		CreateAuthHeader: function(consumerKey, signature, timeStamp, 
								   nonce, realm, authCallback, token){
			var quo = "\"";
			return { key: "Authorization", value:
				"OAuth " + 
				(realm?"realm=\""+realm+"\", ":"") + // Realm (optional)
				"oauth_nonce=" + quo + nonce + quo + ", " + 
				"oauth_signature_method=\"HMAC-SHA1\", " +
				"oauth_timestamp=" + quo + timeStamp + quo + ", " +
				"oauth_consumer_key=" + quo + consumerKey + quo + ", " +
				"oauth_signature=" + quo + HttpUtility.UrlEncode(signature) + quo + ", " +
				(token ? "oauth_token="+ quo + HttpUtility.UrlEncode(token) + quo + ", " : "") +
				"oauth_version=\"1.0\"" +
				(authCallback ? ", oauth_callback=\""+authCallback+"\"" : "") // Callback (optional)
			};		
		}
	}
});