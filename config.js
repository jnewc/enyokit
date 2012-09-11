if(window.enyokit && !enyokit.config) {
	
	/*
		This has contains all the global configuration options
		available for enyokit. You should tweak the options to
		your preferred values.
		
		If the option description is prefixed with a ! then
		only alter it if you definitely know what you're
		doing (Here be dragons etc.)
		
		The default value for options is always the one that has
		the least negative implications, for example an option
		that enables a PHP-based feature or extends a built-in's
		prototype will always be switched off by default.
	*/
	enyokit.config = {
	
		// -------------------- core -------------------- //

		/** Set which global packages should be loaded.
			NOTE: you should probably comment out unused libs rather than delete.
			Order shouldn't matter in the future, but don't change it for now. 
		*/
		libs:["data","core","net", "ui", "utils"],

		//* Sets whether enyokit should register itself as a namespace.
		doRegisterTheme: true,
			
		// -------------------- net  -------------------- //
		
		//* ! Use a PHP Proxy where cross-domain AJAX isn't already available
		ajaxUseProxy: false,
		
		// -------------------- utils -------------------- //
		
		//* ! Add additional methods to the string prototype with methods
		//    from StringUtility.
		extendString: false
		
	};

}