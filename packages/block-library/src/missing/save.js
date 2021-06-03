/**
 * WordPress dependencies
 */
import { RawHTML } from '@aarondewes/wp-element';

export default function save( { attributes } ) {
	// Preserve the missing block's content.
	return <RawHTML>{ attributes.originalContent }</RawHTML>;
}
