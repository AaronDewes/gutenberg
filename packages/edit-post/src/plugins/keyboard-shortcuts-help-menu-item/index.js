/**
 * WordPress dependencies
 */
import { MenuItem } from '@aarondewes/wp-components';
import { withDispatch } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { displayShortcut } from '@aarondewes/wp-keycodes';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

export function KeyboardShortcutsHelpMenuItem( { openModal } ) {
	return (
		<MenuItem
			onClick={ () => {
				openModal( 'edit-post/keyboard-shortcut-help' );
			} }
			shortcut={ displayShortcut.access( 'h' ) }
		>
			{ __( 'Keyboard shortcuts' ) }
		</MenuItem>
	);
}

export default withDispatch( ( dispatch ) => {
	const { openModal } = dispatch( editPostStore );

	return {
		openModal,
	};
} )( KeyboardShortcutsHelpMenuItem );
