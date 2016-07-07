
// main container
var data = {};



var Data = function( obj, callback ){

	this.collection = obj;

	// save data now
	data = utils.extend(data, this.collection);

	return this.update.bind(this);
};

Data.prototype.update = function( bufferList ) {
	// save buffer list
	i = 0;
	for( var key in this.collection ){
		// assume the same order
		data[key].buffer = bufferList[i];
		i++;
	}
	// delete instance?
};
