/**
 * WordPress dependencies
 */
import { pages as icon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit.js';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {},
	edit,
};
