(function(){
	// Get packages to load from config, or default to core.
	var libs = (enyokit.config && enyokit.config.libs) || ["core"];
	enyo.log("LOADING LIBS: " + JSON.stringify(libs));

	// Load selected packages.
	enyo.depends.apply(enyo, libs);

}());