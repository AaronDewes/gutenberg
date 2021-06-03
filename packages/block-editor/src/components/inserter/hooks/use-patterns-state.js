/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { useCallback } from '@aarondewes/wp-element';
import { cloneBlock } from '@aarondewes/wp-blocks';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { __, sprintf } from '@aarondewes/wp-i18n';
import { store as noticesStore } from '@aarondewes/wp-notices';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../../store';

/**
 * Retrieves the block patterns inserter state.
 *
 * @param {Function} onInsert     function called when inserter a list of blocks.
 * @param {string=}  rootClientId Insertion's root client ID.
 *
 * @return {Array} Returns the patterns state. (patterns, categories, onSelect handler)
 */
const usePatternsState = ( onInsert, rootClientId ) => {
	const { patternCategories, patterns } = useSelect(
		( select ) => {
			const { __experimentalGetAllowedPatterns, getSettings } = select(
				blockEditorStore
			);
			return {
				patterns: __experimentalGetAllowedPatterns( rootClientId ),
				patternCategories: getSettings()
					.__experimentalBlockPatternCategories,
			};
		},
		[ rootClientId ]
	);
	const { createSuccessNotice } = useDispatch( noticesStore );
	const onClickPattern = useCallback( ( pattern, blocks ) => {
		onInsert(
			map( blocks, ( block ) => cloneBlock( block ) ),
			pattern.name
		);
		createSuccessNotice(
			sprintf(
				/* translators: %s: block pattern title. */
				__( 'Block pattern "%s" inserted.' ),
				pattern.title
			),
			{
				type: 'snackbar',
			}
		);
	}, [] );

	return [ patterns, patternCategories, onClickPattern ];
};

export default usePatternsState;
