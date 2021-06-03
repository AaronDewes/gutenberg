/**
 * External dependencies
 */
const path = require( 'path' );

/**
 * Internal dependencies
 */
const { hasBabelConfig } = require( '../utils' );

const jestUnitConfig = {
	testRunner: 'jest-circus/runner',
	preset: '@aarondewes/wp-jest-preset-default',
	reporters: [
		'default',
		path.join( __dirname, 'jest-github-actions-reporter.js' ),
	],
};

if ( ! hasBabelConfig() ) {
	jestUnitConfig.transform = {
		'^.+\\.[jt]sx?$': path.join( __dirname, 'babel-transform' ),
	};
}

module.exports = jestUnitConfig;
