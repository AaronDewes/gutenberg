/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { speak } from '@aarondewes/wp-a11y';
import { MenuItem } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { store as interfaceStore } from '@aarondewes/wp-interface';
import { store as keyboardShortcutsStore } from '@aarondewes/wp-keyboard-shortcuts';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import { STORE_NAME } from '../../store/constants';
import { SIDEBAR_BLOCK } from '../sidebar/constants';

export default function BlockInspectorButton( { onClick = () => {} } ) {
	const { shortcut, isBlockInspectorOpen } = useSelect(
		( select ) => ( {
			shortcut: select(
				keyboardShortcutsStore
			).getShortcutRepresentation(
				'core/edit-site/toggle-block-settings-sidebar'
			),
			isBlockInspectorOpen:
				select( interfaceStore ).getActiveComplementaryArea(
					editSiteStore.name
				) === SIDEBAR_BLOCK,
		} ),
		[]
	);
	const { enableComplementaryArea, disableComplementaryArea } = useDispatch(
		interfaceStore
	);

	const label = isBlockInspectorOpen
		? __( 'Hide more settings' )
		: __( 'Show more settings' );

	return (
		<MenuItem
			onClick={ () => {
				if ( isBlockInspectorOpen ) {
					disableComplementaryArea( STORE_NAME );
					speak( __( 'Block settings closed' ) );
				} else {
					enableComplementaryArea( STORE_NAME, SIDEBAR_BLOCK );
					speak(
						__(
							'Additional settings are now available in the Editor block settings sidebar'
						)
					);
				}
				// Close dropdown menu.
				onClick();
			} }
			shortcut={ shortcut }
		>
			{ label }
		</MenuItem>
	);
}
