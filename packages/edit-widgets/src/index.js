/**
 * WordPress dependencies
 */
import {
	registerBlockType,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@aarondewes/wp-blocks';
import { render } from '@aarondewes/wp-element';
import {
	registerCoreBlocks,
	__experimentalGetCoreBlocks,
	__experimentalRegisterExperimentalCoreBlocks,
} from '@aarondewes/wp-block-library';
import { __experimentalFetchLinkSuggestions as fetchLinkSuggestions } from '@aarondewes/wp-core-data';
import { registerLegacyWidgetVariations } from '@aarondewes/wp-widgets';

/**
 * Internal dependencies
 */
import './store';
import './filters';
import * as widgetArea from './blocks/widget-area';
import Layout from './components/layout';

/**
 * Initializes the block editor in the widgets screen.
 *
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} settings Block editor settings.
 */
export function initialize( id, settings ) {
	const coreBlocks = __experimentalGetCoreBlocks().filter(
		( block ) => ! [ 'core/more' ].includes( block.name )
	);
	registerCoreBlocks( coreBlocks );
	if ( process.env.GUTENBERG_PHASE === 2 ) {
		__experimentalRegisterExperimentalCoreBlocks();
	}
	registerLegacyWidgetVariations( settings );
	registerBlock( widgetArea );
	settings.__experimentalFetchLinkSuggestions = ( search, searchOptions ) =>
		fetchLinkSuggestions( search, searchOptions, settings );
	render(
		<Layout blockEditorSettings={ settings } />,
		document.getElementById( id )
	);
}

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { metadata, settings, name } = block;
	if ( metadata ) {
		unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } );
	}
	registerBlockType( name, settings );
};
