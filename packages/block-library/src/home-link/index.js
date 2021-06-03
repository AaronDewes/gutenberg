/**
 * WordPress dependencies
 */
import { _x } from '@aarondewes/wp-i18n';
import { home } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: home,

	edit,

	save,

	example: {
		attributes: {
			label: _x( 'Home Link', 'block example' ),
		},
	},
};
