/**
 * WordPress dependencies
 */
import { RawHTML } from '@aarondewes/wp-element';

export default function save() {
	return <RawHTML>{ '<!--nextpage-->' }</RawHTML>;
}
