/**
 * External dependencies
 */
import { compact } from 'lodash';

/**
 * WordPress dependencies
 */
import { RawHTML } from '@aarondewes/wp-element';

export default function save( { attributes: { customText, noTeaser } } ) {
	const moreTag = customText ? `<!--more ${ customText }-->` : '<!--more-->';

	const noTeaserTag = noTeaser ? '<!--noteaser-->' : '';

	return (
		<RawHTML>{ compact( [ moreTag, noTeaserTag ] ).join( '\n' ) }</RawHTML>
	);
}
