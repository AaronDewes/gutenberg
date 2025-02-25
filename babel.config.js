module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [ '@aarondewes/wp-babel-preset-default' ],
		plugins: [ '@emotion/babel-plugin', 'babel-plugin-inline-json-import' ],
	};
};
