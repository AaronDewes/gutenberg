/**
 * WordPress dependencies
 */
import { login as icon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	edit,
};
