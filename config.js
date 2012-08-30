if(window.enyokit && !enyokit.config) {
	
	/*
		This has contains all the global configuration options
		available for enyokit. You should tweak the options to
		your preferred values.
	*/
	enyokit.config = {
	
		// -------------------- core -------------------- //

		/** Set which global packages should be loaded.
			NOTE: you should probably comment out unused libs rather than delete.
			Order won't matter in the future, but don't change it for now. 
		*/
		libs:["data","core","net"],

		//* Sets whether enyokit should register itself as a namespace.
		doRegisterTheme: true,
			
		// -------------------- net  -------------------- //
		
		//* Use a PHP Proxy where cross-domain AJAX isn't already available
		ajaxUseProxy: false
		
	};

}