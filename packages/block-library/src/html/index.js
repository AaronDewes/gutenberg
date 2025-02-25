/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { html as icon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			content:
				'<marquee>' +
				__( 'Welcome to the wonderful world of blocks…' ) +
				'</marquee>',
		},
	},
	edit,
	save,
	transforms,
};
