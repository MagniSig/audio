
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
