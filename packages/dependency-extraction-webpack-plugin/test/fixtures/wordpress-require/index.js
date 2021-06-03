/**
 * WordPress dependencies
 */
const { isBlobURL } = require( '@aarondewes/wp-blob' );

/**
 * External dependencies
 */
const _ = require( 'lodash' );

_.isEmpty( isBlobURL( '' ) );
