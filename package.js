(function(){

/* -------------------- Init config -------------------- */

// Create the root object if it's undefined.
window.enyokit = window.enyokit || {};

// Pre-loader utils
enyokit._loadScript = function(inSrc) { document.write('<scri'+'pt src="' + inSrc + '"></scri'+'pt>'); };

// Load config, then preloader.
enyokit._loadScript("config.js");
enyokit._loadScript("preloader.js");


/* -------------------- Finish Setup ------------------- */

// Register the namespace so it will override enyo/onyx.
if(enyokit.config && enyokit.config.doRegisterTheme) {
	enyo.registerTheme("enyokit");
}


}());