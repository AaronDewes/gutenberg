/**
 * External dependencies
 */
import { css } from '@emotion/react';
import { mapKeys } from 'lodash';

/**
 * WordPress dependencies
 */
import { isRTL } from '@aarondewes/wp-i18n';

const LOWER_LEFT_REGEXP = new RegExp( /-left/g );
const LOWER_RIGHT_REGEXP = new RegExp( /-right/g );
const UPPER_LEFT_REGEXP = new RegExp( /Left/g );
const UPPER_RIGHT_REGEXP = new RegExp( /Right/g );

/**
 * Flips a CSS property from left <-> right.
 *
 * @param {string} key The CSS property name.
 *
 * @return {string} The flipped CSS property name, if applicable.
 */
function getConvertedKey( key ) {
	if ( key === 'left' ) {
		return 'right';
	}

	if ( key === 'right' ) {
		return 'left';
	}

	if ( LOWER_LEFT_REGEXP.test( key ) ) {
		return key.replace( LOWER_LEFT_REGEXP, '-right' );
	}

	if ( LOWER_RIGHT_REGEXP.test( key ) ) {
		return key.replace( LOWER_RIGHT_REGEXP, '-left' );
	}

	if ( UPPER_LEFT_REGEXP.test( key ) ) {
		return key.replace( UPPER_LEFT_REGEXP, 'Right' );
	}

	if ( UPPER_RIGHT_REGEXP.test( key ) ) {
		return key.replace( UPPER_RIGHT_REGEXP, 'Left' );
	}

	return key;
}

/**
 * An incredibly basic ltr -> rtl converter for style properties
 *
 * @param {import('react').CSSProperties} ltrStyles
 *
 * @return {import('react').CSSProperties} Converted ltr -> rtl styles
 */
export const convertLTRToRTL = ( ltrStyles = {} ) => {
	return mapKeys( ltrStyles, ( _value, key ) => getConvertedKey( key ) );
};

/**
 * A higher-order function that create an incredibly basic ltr -> rtl style converter for CSS objects.
 *
 * @param {import('react').CSSProperties} ltrStyles   Ltr styles. Converts and renders from ltr -> rtl styles, if applicable.
 * @param {import('react').CSSProperties} [rtlStyles] Rtl styles. Renders if provided.
 *
 * @return {Function} A function to output CSS styles for Emotion's renderer
 */
export function rtl( ltrStyles = {}, rtlStyles ) {
	return () => {
		if ( rtlStyles ) {
			// @ts-ignore: `css` types are wrong, it can accept an object: https://emotion.sh/docs/object-styles#with-css
			return isRTL() ? css( rtlStyles ) : css( ltrStyles );
		}

		// @ts-ignore: `css` types are wrong, it can accept an object: https://emotion.sh/docs/object-styles#with-css
		return isRTL() ? css( convertLTRToRTL( ltrStyles ) ) : css( ltrStyles );
	};
}
