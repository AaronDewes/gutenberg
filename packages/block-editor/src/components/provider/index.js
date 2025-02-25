/**
 * WordPress dependencies
 */
import { useDispatch } from '@aarondewes/wp-data';
import { useEffect } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import withRegistryProvider from './with-registry-provider';
import useBlockSync from './use-block-sync';
import { store as blockEditorStore } from '../../store';
import { BlockRefsProvider } from './block-refs-provider';

/** @typedef {import('@aarondewes/wp-data').WPDataRegistry} WPDataRegistry */

function BlockEditorProvider( props ) {
	const { children, settings } = props;

	const { updateSettings } = useDispatch( blockEditorStore );
	useEffect( () => {
		updateSettings( settings );
	}, [ settings ] );

	// Syncs the entity provider with changes in the block-editor store.
	useBlockSync( props );

	return <BlockRefsProvider>{ children }</BlockRefsProvider>;
}

export default withRegistryProvider( BlockEditorProvider );
