/**
 * WordPress dependencies
 */
import { regexp } from '@aarondewes/wp-shortcode';
import deprecated from '@aarondewes/wp-deprecated';

export function addActiveFormats( value, activeFormats ) {
	if ( activeFormats.length ) {
		let index = value.formats.length;

		while ( index-- ) {
			value.formats[ index ] = [
				...activeFormats,
				...( value.formats[ index ] || [] ),
			];
		}
	}
}

/**
 * Get the multiline tag based on the multiline prop.
 *
 * @param {?(string|boolean)} multiline The multiline prop.
 *
 * @return {?string} The multiline tag.
 */
export function getMultilineTag( multiline ) {
	if ( multiline !== true && multiline !== 'p' && multiline !== 'li' ) {
		return;
	}

	return multiline === true ? 'p' : multiline;
}

export function getAllowedFormats( {
	allowedFormats,
	formattingControls,
	disableFormats,
} ) {
	if ( disableFormats ) {
		return getAllowedFormats.EMPTY_ARRAY;
	}

	if ( ! allowedFormats && ! formattingControls ) {
		return;
	}

	if ( allowedFormats ) {
		return allowedFormats;
	}

	deprecated( 'wp.blockEditor.RichText formattingControls prop', {
		since: '5.4',
		alternative: 'allowedFormats',
	} );

	return formattingControls.map( ( name ) => `core/${ name }` );
}

getAllowedFormats.EMPTY_ARRAY = [];

export const isShortcode = ( text ) => regexp( '.*' ).test( text );
