/**
 * External dependencies
 */
import { clone } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@aarondewes/wp-hooks';

/**
 * Internal dependencies
 */
import { userAutocompleter } from '../components';

function setDefaultCompleters( completers = [] ) {
	// Provide copies so filters may directly modify them.
	completers.push( clone( userAutocompleter ) );

	return completers;
}

addFilter(
	'editor.Autocomplete.completers',
	'editor/autocompleters/set-default-completers',
	setDefaultCompleters
);
