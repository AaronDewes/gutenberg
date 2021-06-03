/**
 * WordPress dependencies
 */
import { RawHTML } from '@aarondewes/wp-element';

export default function save( { attributes } ) {
	return <RawHTML>{ attributes.text }</RawHTML>;
}
