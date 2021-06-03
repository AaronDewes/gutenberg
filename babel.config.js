module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [ '@aarondewes/wp-babel-preset-default' ],
		plugins: [ 'babel-plugin-emotion', 'babel-plugin-inline-json-import' ],
	};
};
