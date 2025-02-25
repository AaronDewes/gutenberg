/**
 * WordPress dependencies
 */
import { _x } from '@aarondewes/wp-i18n';
import { customLink as linkIcon } from '@aarondewes/wp-icons';
import { InnerBlocks } from '@aarondewes/wp-block-editor';
import { addFilter } from '@aarondewes/wp-hooks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import { enhanceNavigationLinkVariations } from './hooks';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: linkIcon,

	__experimentalLabel: ( { label } ) => label,

	merge( leftAttributes, { label: rightLabel = '' } ) {
		return {
			...leftAttributes,
			label: leftAttributes.label + rightLabel,
		};
	},

	edit,

	save,

	example: {
		attributes: {
			label: _x( 'Example Link', 'navigation link preview example' ),
			url: 'https://example.com',
		},
	},

	deprecated: [
		{
			isEligible( attributes ) {
				return attributes.nofollow;
			},

			attributes: {
				label: {
					type: 'string',
				},
				type: {
					type: 'string',
				},
				nofollow: {
					type: 'boolean',
				},
				description: {
					type: 'string',
				},
				id: {
					type: 'number',
				},
				opensInNewTab: {
					type: 'boolean',
					default: false,
				},
				url: {
					type: 'string',
				},
			},

			migrate( { nofollow, ...rest } ) {
				return {
					rel: nofollow ? 'nofollow' : '',
					...rest,
				};
			},

			save() {
				return <InnerBlocks.Content />;
			},
		},
	],
};

// importing this file includes side effects. This is whitelisted in block-library/package.json under sideEffects
addFilter(
	'blocks.registerBlockType',
	'core/navigation-link',
	enhanceNavigationLinkVariations
);
