/**
 * WordPress dependencies
 */
import { registerFormatType } from '@aarondewes/wp-rich-text';

/**
 * Internal dependencies
 */
import { annotation } from './annotation';

const { name, ...settings } = annotation;

registerFormatType( name, settings );
