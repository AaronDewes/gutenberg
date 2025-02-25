/**
 * WordPress dependencies
 */
import { tag as icon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {},
	edit,
};
