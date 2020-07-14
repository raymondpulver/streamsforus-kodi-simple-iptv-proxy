'use strict';

module.exports = {
	context: {
		get: require('./lib/get'),
		format: require('./lib/format'),
		createServer: require('./lib/server')
	}
};
