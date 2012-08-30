/**
	CSS Prefixes availability by browser/engine.
	
	Source: http://peter.sh/experiments/vendor-prefixed-css-property-overview/
	Last Updated: 2012-08-22
*/

enyokit.CSSPrefixes = {
	
/* Flex Box Layout */
	
"box-align":  { standard: true, moz: true, webkit: true, ms: true },
"box-flex":   { standard: true, moz: true, webkit: true, ms: true },
"box-orient": { standard: true, moz: true, webkit: true, ms: true },
"box-pack":   { standard: true, moz: true, webkit: true, ms: true },

"box-shadow": { standard: true,            webkit: true },
"box-sizing": { standard: true, moz: true, webkit: true },

/* User Rules */

"user-select": { webkit: true, moz: true, ms: true },
"user-modify": { webkit: true, moz: true, ms: true },

/* Word Rules */

"word-break": { standard: true, ms: true },
"word-wrap":  { standard: true, ms: true },

/* Transform Rules */

"transform":        { standard: true, webkit: true, ms: true, o: true },
"transform-origin": { standard: true, webkit: true, ms: true, o: true },

/* Transition Rules */

"transition":          { standard: true, webkit: true, ms: true, o: true },
"transition-delay":    { standard: true, webkit: true, ms: true, o: true },
"transition-duration": { standard: true, webkit: true, ms: true, o: true },
"transition-property": { standard: true, webkit: true, ms: true, o: true },
"transition-timing-function": {
						 standard: true, webkit: true, ms: true, o:true },

	
/* Animation Rules */

"animation-delay":    { standard: true, webkit: true, ms: true },
"animation-duration": { standard: true, webkit: true, ms: true }
// TODO


};