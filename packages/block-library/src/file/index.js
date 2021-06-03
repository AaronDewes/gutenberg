/**
 * WordPress dependencies
 */
import { _x } from '@aarondewes/wp-i18n';
import { file as icon } from '@aarondewes/wp-icons';

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
			href:
				'https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg',
			fileName: _x( 'Armstrong_Small_Step', 'Name of the file' ),
		},
	},
	transforms,
	edit,
	save,
};
