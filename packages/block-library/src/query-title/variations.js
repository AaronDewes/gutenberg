/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { archiveTitle } from '@aarondewes/wp-icons';
const variations = [
	{
		isDefault: true,
		name: 'archive-title',
		title: __( 'Archive Title' ),
		description: __(
			'Display the archive title based on the queried object.'
		),
		icon: archiveTitle,
		attributes: {
			type: 'archive',
		},
		scope: [ 'inserter' ],
	},
];

/**
 * Add `isActive` function to all `query-title` variations, if not defined.
 * `isActive` function is used to find a variation match from a created
 *  Block by providing its attributes.
 */
variations.forEach( ( variation ) => {
	if ( variation.isActive ) return;
	variation.isActive = ( blockAttributes, variationAttributes ) =>
		blockAttributes.type === variationAttributes.type;
} );

export default variations;
