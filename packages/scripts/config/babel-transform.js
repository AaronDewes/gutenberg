/**
 * External dependencies
 */
const babelJest = require( 'babel-jest' );

module.exports = babelJest.createTransformer( {
	presets: [ '@aarondewes/wp-babel-preset-default' ],
} );
