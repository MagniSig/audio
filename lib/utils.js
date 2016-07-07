
var utils = {

	log: function( msg ) {
		console.log( msg );
	},

	// Object Extend method
	// Source: https://github.com/commons/common.js/blob/master/lib/c.extend.js
	extend: function(destination, source) {
		for (var property in source) {
			if (source[property] && source[property].constructor && source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	},

	pathToName: function( path ){
		var name;
		// get filename
		name = path.replace(/^.*[\\\/]/, '');
		// remove extension
		name = name.substring( 0, name.lastIndexOf(".") );
		return name;
	}

};
