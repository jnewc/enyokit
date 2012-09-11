(function(){

var regex_htmltag = /<\/?[^>]+>/gi;

enyo.kind({
	name: "StringUtility",
	
	statics: {
		
		// General Utils
	
		remove: function(source, pattern) {
			return source.replace(pattern, "");
		},
		
		beginsWith: function(source, pattern) {
			return source.indexOf(pattern) === 0;
		},
		
		endsWith: function(source, pattern) {
			return source.indexOf(pattern) === source.length - pattern.length;
		},
		
		contains: function(source, pattern) {
			return source.indexOf(pattern !== -1);
		},
		
		// HTML Utils
		
		stripHtmlTags: function(source) {
			return StringUtility.remove(source, regex_htmltag);
		}
	}
});

if(enyokit.config && enyokit.config.extendString) {
	// For now just add General Utils.
	String.prototype.remove = function(pattern) { 
		return enyokit.StringUtility.remove(this, pattern); 
	};
	String.prototype.beginsWith = function(pattern) {
		return enyokit.StringUtility.beginsWith(this, pattern);
	};
	String.prototype.endsWith = function(pattern) {
		return enyokit.StringUtility.endsWith(this, pattern);
	};
	String.prototype.contains = function(pattern) {
		return enyokit.StringUtility.contains(this, pattern);
	};
}

}());