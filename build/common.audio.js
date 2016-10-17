/**
 * @name common.audio
 * Common methods usind the Web Audio API
 *
 * Version: 0.2.0 (Mon, 17 Oct 2016 06:26:03 GMT)
 * Source: http://github.com/commons/audio
 *
 * @author makesites
 * Initiated by: Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 *
 * @cc_on Copyright © Makesites.org
 * @license Released under the MIT
 */

(function (lib) {

	//"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		var deps = [];
		define('common.audio', deps, lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		lib(window._, window.Backbone);
	}
}(function () {

	//"use strict";

	// find context
	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
	} catch(e) {
		log('Web Audio API is not supported in this browser');
	}
	//if( 'webkitAudioContext' in window ) context = new webkitAudioContext();
	//if( 'AudioContext' in window ) context = new AudioContext();



var Audio = function( params, options ){
	// prerequisite
	if( !context ) {
		utils.log( 'ERROR: No AudioContext available. Try Chrome, Safari of Firefox Nightly.' );
		return;
	}
	// init
	if( options ) this.options = utils.extend(this.options, options);
	if( params ) this.load( params );
};

Audio.prototype.load = function( params, cb ){
	// prerequisites
	if( !params ) return;
	// fallbacks
	cb = cb || function(){};
	// variables
	var queue = [],
		list = {},
		path, name;
	// resource data
	if( params instanceof Array ){
		// no keys
		queue = params;
		// compile list
		for( var i in params ){
			path = params[i];
			name = utils.pathToName(path);
			list[name] = path;
		}
	} else if ( params instanceof Object ){
		for( var j in params ){
			queue.push( params[j] );
		}
		list = params;
	} else {
		// assume string?
		path = params;
		name = utils.pathToName(path);
		queue.push( path );
		list[name] = path;
	}

	// new buffer
	var loader = new BufferLoader(
		context,
		queue,
		new Data(list, cb)
	);
	// execute
	loader.load();
};

// no options...
Audio.prototype.options = {};

Audio.prototype.play = function( key ){
	// prerequisites
	if( !data[key] ) return utils.log('no audio loaded with the key:'+ key);
	if( !data[key].buffer ) return utils.log('audio has not loaded yet');
	// get buffer
	var source = context.createBufferSource();
	source.buffer = data[key].buffer;
	source.connect(context.destination);
	source.start(0);
};


// main container
var data = {};



var Data = function( obj, callback ){

	this.collection = obj;

	// save data now
	data = utils.extend(data, this.collection);

	return this.update.bind(this); // used as a callback in BufferLoader
};

Data.prototype.update = function( bufferList ) {
	// save buffer list
	for( var key in this.collection ){
		var file = this.collection[key];
		var index = this.toIndex(key);
		// replace string value with object
		data[key] = {
			file: file,
			buffer: bufferList[index]
		};
	}
	// delete instance?
};

// find the order of a key
Data.prototype.toIndex = function( key ) {
	var index = 0;
	for( var i in this.collection ){
		if( i == key ) break;
		index++;
	}
	return index;
};


function BufferLoader(context, urlList, callback) {
	this.context = context;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = []; //new Array();
	this.loadCount = 0;
}


BufferLoader.prototype.loadBuffer = function(url, index) {
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	var loader = this;

	request.onload = function() {

		// Asynchronously decode the audio file data in request.response
		loader.context.decodeAudioData(
			request.response,
			function(buffer) {
				if (!buffer) {
					utils.log("error decoding file data: "+ url);
					return;
				}
				loader.bufferList[index] = buffer;
				if (++loader.loadCount == loader.urlList.length)
					loader.onload(loader.bufferList);
			},
			function(error) {
				utils.log("decodeAudioData error: "+ error);
			}
		);

	};

	request.onprogress = function( e ) {
		//progressCallback( e.loaded * 100 / e.total );
	};
	request.onerror = function() {
		utils.log('BufferLoader: XHR error');
	};

	request.send();
};

BufferLoader.prototype.load = function() {
	for (var i = 0; i < this.urlList.length; ++i)
		this.loadBuffer(this.urlList[i], i);
};


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



	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {

		// expose to the global namespace
		window.CommonAudio = Audio;

	}

	// for module loaders:
	return Audio;

}));
