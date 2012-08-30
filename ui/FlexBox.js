enyo.kind({
	name: "enyokit.FlexBox", 
	kind: "enyokit.Control",
	
	published: {
		orient: null,
		flex: null,
		pack: "start",
		align: "stretch"
	},
	
	// ------------------------------ Property Change Handlers ------------------------------ //
	
	orientChanged: function(){
		// Remove existing flex class if necessary
		if(this._flexClass) {
			this.removeClass(this._flexClass);
		}
		// Add new flex class
		if(this.getOrient() === "vertical"){
			this._flexClass = "enyokit-vflexbox";
		} else if(this.getOrient() === "horizontal") {
			this._flexClass = "enyokit-hflexbox";
		} else { // Bad class (TODO: change?)
			this._flexClass = undefined;
		}
		// Add new class if available
		if(this._flexClass){
			this.addClass(this._flexClass);
		}
	},
	
	flexChanged: function(){
		var f = this.getFlex();
		if(typeof f === "number"){
			this.applyStyle("-webkit-box-flex", f);
		}
	},
	
	packChanged: function(){
		this.applyStyle("-webkit-box-pack", this.getPack());
	},
	alignChanged: function(){
		this.applyStyle("-webkit-box-align", this.getAlign());
	},
	
	
	create: function(){
		this.inherited(arguments);
		
		this.orientChanged();
		this.packChanged();
		this.alignChanged();
		this.flexChanged();
	}
	
});

enyo.kind({
	name: "enyokit.HFlexBox",
	kind: "enyokit.FlexBox",
	
	//published: {
		orient: "horizontal"
	//}
});

enyo.kind({
	name: "enyokit.VFlexBox",
	kind: "enyokit.FlexBox",
	
	//published: {
		orient: "vertical"
	//}
});