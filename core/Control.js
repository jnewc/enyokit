enyo.kind({
	name: "enyokit.Control",
	kind: "enyo.Control",
	
	published: {
		/** Defines whether the &lt;propertyName&gt;Changed method of each
			published property should be called after construction. Note that
			this will not occur for kinds in the 'enyo' and 'onyx' namespaces.
		*/
		autoInitProps: false,
		/** 
			Defines whether transitions should be enabled for all 
			possible CSS rule changes for this control. This is done
			by simply setting the first argument of the 'transition'
			rule to "all".
			
			This property's value can be either a bool or an object.
			If an object, it should include the properties: <em>duration</em>
			(as a decimal value), and <em>type</em> (as a string e.g "ease-in-out")
		*/
		alwaysTransition: true
	},
	
	alwaysTransitionChanged: function() {
		var at = this.getAlwaysTransition(), val;
		if(at){
			val = "all " + (at.duration || "0.5") + "s " + (at.type || "ease-in-out");
			this.applyStyleWithPrefixes("transition", val);
		}
	},
	
	/**
		Checks if there are any prefixed versions of a CSS rule and
		if there are, applies them. Also applies the standard rule
		if it is applicable.
	*/
	applyStyleWithPrefixes: function(name, value) {
		var prefixes, prefix, nm;
		if(enyokit.CSSPrefixes && enyokit.CSSPrefixes[name]) {
			prefixes = enyokit.CSSPrefixes[name]; 
			for(prefix in prefixes) { 
				if(prefix !== "standard") {
					nm = "-" + prefix + "-" + name;
					this.applyStyle(nm, value);
				}
			}
			if(prefixes.standard){
				this.applyStyle(name, value);
			}
		}
		else {
			this.applyStyle(name, value);
		}
	},
	
	constructed: function() {
		var proto = this["__proto__"], prop, f, ctoken = "Changed";
		this.inherited(arguments);
		
		// Auto-init properties
		// NOTE: This will only init properties that are outside of the enyo and
		// onyx namespaces, to avoid any triggering of unnecessary behaviour.
		// For the sake of consistency, the autoInitProps flag defaults to false.
		if(this.getAutoInitProps()) {
			do {
				// Only init properties for non-enyo libs. Check that .. 
				if(typeof proto.published === "object"    && // .. published is available.
				   proto.kindName.indexOf("enyo.") === -1 && // .. and not enyo core.
				   proto.kindName.indexOf("onyx.") === -1) { // .. and not onyx lib.
					for(prop in proto.published) {
						f = this[prop + ctoken];
						if(typeof f === "function") {
							f.apply(this); // TODO: give params?
						}
					}
				}
				proto = proto["__proto__"];
			}
			while(proto !== undefined);
		}
	}
});