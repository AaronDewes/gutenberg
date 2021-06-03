/**
 * WordPress dependencies
 */
import { RawHTML } from '@aarondewes/wp-element';

export default function save( { attributes } ) {
	const { content } = attributes;

	return <RawHTML>{ content }</RawHTML>;
}
