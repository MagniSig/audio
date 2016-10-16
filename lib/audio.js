
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
