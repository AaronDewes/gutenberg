/**
 * WordPress dependencies
 */
import { share as icon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import variations from './variations';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	edit,
	variations,
};
