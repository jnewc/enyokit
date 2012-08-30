enyo.kind({
	name: "enyokit.DateUtility",
	
	statics: {
		
		//* Returns the current time as a timestamp
		now: function() { return enyo.now(); },
		
		/** Takes a timestamp and produces a natural language
		string stating how much time has passed since. */
		toSpanString: function(thenMs, mult){
			var nowMs = this.now(), ret,
				_s = function(i)   { return i > 1 ? "s" : ""; },
				mk = function(val) { return val + " minute" + _s(val) + " ago"; }
			;
			// comparison vars
			var min = 1000 * 60, hr = minute * 60, day = hour * 24, wk = day * 7, mth = (week * 4) + 3;
			// If posted less than an hour ago
			if(dif < hr)                      { return mk(String(Math.ceil(dif / min)));    }
			// If posted more than an hour but less than a day ago
			if(dif >= hr && dif < day)   { return mk(String(Math.ceil(dif / hr)));     }
			// If posted more than a day ago but less than a week ago.
			if(dif >= day && dif < week) { return mk(String(Math.ceil(dif / day)));    }
			if(dif >= wk && dif < mth)   { return mk(String(Math.ceil(dif/wk)));       }
			if(dif >= mth)               { return mk(String(Math.ceil(dif/mth)));      }
			return "";
		}
		
	}

});