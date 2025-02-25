/**
 * WordPress dependencies
 */
import {
	registerCoreBlocks,
	__experimentalRegisterExperimentalCoreBlocks,
} from '@aarondewes/wp-block-library';
import { render } from '@aarondewes/wp-element';
import { __experimentalFetchLinkSuggestions as fetchLinkSuggestions } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { addFilters } from './filters';

/**
 * Internal dependencies
 */
import Layout from './components/layout';
import './store';

export function initialize( id, settings ) {
	addFilters( ! settings.blockNavMenus );
	registerCoreBlocks();

	if ( process.env.GUTENBERG_PHASE === 2 ) {
		__experimentalRegisterExperimentalCoreBlocks();
	}

	settings.__experimentalFetchLinkSuggestions = ( search, searchOptions ) =>
		fetchLinkSuggestions( search, searchOptions, settings );

	render(
		<Layout blockEditorSettings={ settings } />,
		document.getElementById( id )
	);
}
