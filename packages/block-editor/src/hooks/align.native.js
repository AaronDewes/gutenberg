/**
 * External dependencies
 */
import { without } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@aarondewes/wp-hooks';
import { hasBlockSupport } from '@aarondewes/wp-blocks';
import { WIDE_ALIGNMENTS } from '@aarondewes/wp-components';

const ALIGNMENTS = [ 'left', 'center', 'right' ];

export * from './align.js';

// Used to filter out blocks that don't support wide/full alignment on mobile
addFilter(
	'blocks.registerBlockType',
	'core/react-native-editor/align',
	( settings, name ) => {
		if (
			WIDE_ALIGNMENTS.excludeBlocks.includes( name ) &&
			hasBlockSupport( settings, 'align' )
		) {
			const blockAlign = settings.supports.align;

			settings.supports = {
				...settings.supports,
				align: Array.isArray( blockAlign )
					? without(
							blockAlign,
							...Object.values( WIDE_ALIGNMENTS.alignments )
					  )
					: blockAlign,
				alignWide: false,
			};
			settings.attributes = {
				...settings.attributes,
				align: {
					type: 'string',
					// Allow for '' since it is used by updateAlignment function
					// in withToolbarControls for special cases with defined default values.
					enum: [ ...ALIGNMENTS, '' ],
				},
			};
		}

		return settings;
	}
);
