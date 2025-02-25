/**
 * External dependencies
 */
import { clone } from 'lodash';

/**
 * WordPress dependencies
 */
import { applyFilters, hasFilter } from '@aarondewes/wp-hooks';
import {
	Autocomplete,
	__unstableUseAutocompleteProps as useAutocompleteProps,
} from '@aarondewes/wp-components';
import { useMemo } from '@aarondewes/wp-element';
import { getDefaultBlockName } from '@aarondewes/wp-blocks';

/**
 * Internal dependencies
 */
import { useBlockEditContext } from '../block-edit/context';
import blockAutocompleter from '../../autocompleters/block';

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array}
 */
const EMPTY_ARRAY = [];

function useCompleters( { completers = EMPTY_ARRAY } ) {
	const { name } = useBlockEditContext();
	return useMemo( () => {
		let filteredCompleters = completers;

		if ( name === getDefaultBlockName() ) {
			filteredCompleters = filteredCompleters.concat( [
				blockAutocompleter,
			] );
		}

		if ( hasFilter( 'editor.Autocomplete.completers' ) ) {
			// Provide copies so filters may directly modify them.
			if ( filteredCompleters === completers ) {
				filteredCompleters = filteredCompleters.map( clone );
			}

			filteredCompleters = applyFilters(
				'editor.Autocomplete.completers',
				filteredCompleters,
				name
			);
		}

		return filteredCompleters;
	}, [ completers, name ] );
}

export function useBlockEditorAutocompleteProps( props ) {
	return useAutocompleteProps( {
		...props,
		completers: useCompleters( props ),
	} );
}

/**
 * Wrap the default Autocomplete component with one that supports a filter hook
 * for customizing its list of autocompleters.
 *
 * @type {import('react').FC}
 */
function BlockEditorAutocomplete( props ) {
	return <Autocomplete { ...props } completers={ useCompleters( props ) } />;
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/autocomplete/README.md
 */
export default BlockEditorAutocomplete;
