/**
 * WordPress dependencies
 */
import { registerFormatType } from '@aarondewes/wp-rich-text';

/**
 * Internal dependencies
 */
import formats from './default-formats';

formats.forEach( ( { name, ...settings } ) =>
	registerFormatType( name, settings )
);
