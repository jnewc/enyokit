enyo.kind({
	name: "HttpUtility",
	
	statics: {
		UrlEncode: function(str) {
			if (!str) { return ""; }
		    str = encodeURIComponent(str);
		    return str
				.replace(/\!/g, "%21").replace(/\*/g, "%2A")
				.replace(/\'/g, "%27").replace(/\(/g, "%28")
				.replace(/\)/g, "%29");
		},
		
		ParamsEncode: function(params, opts) {
			if(params.length !== undefined && params.length > 0) {
				return this.ParamsEncodeArray(params, opts);
			}
			return this.ParamsEncodeObject(params, opts);
		},
		
		ParamsEncodeObject: function(params, opts) {
			var arr = [], c = 0, nm;
			for(nm in params) { 
				arr.push(nm + "=" + HttpUtility.UrlEncode(params[nm])); 
			}
			arr.sort(); // VERY IMPORTANT - query params for OAuth must be sorted 
						// alphabetically by name (ie. a=val&b=val&f=val&x=val)
			return (opts.encode ? HttpUtility.UrlEncode(arr.join("&")) : arr.join("&"));
		},
		
		ParamsEncodeArray: function(params, opts){
			var arr = [], c = 0, i;
			for(i = 0; i <  params.length; i++) {
				arr.push(params[i].key + "=" + HttpUtility.UrlEncode(params[i].value));
			}
			arr.sort(); // VERY IMPORTANT - query params for OAuth must be sorted 
						// alphaetically by name (ie. a=val&b=val&f=val&x=val)
			return (opts.encode ? HttpUtility.UrlEncode(arr.join("&")) : arr.join("&"));
		}
	}
});