/**
 * WordPress dependencies
 */
import { __, isRTL } from '@aarondewes/wp-i18n';
import { ToolbarButton } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { redo as redoIcon, undo as undoIcon } from '@aarondewes/wp-icons';
import { displayShortcut } from '@aarondewes/wp-keycodes';
import { store as coreStore } from '@aarondewes/wp-core-data';

export default function RedoButton() {
	const hasRedo = useSelect( ( select ) => select( coreStore ).hasRedo() );
	const { redo } = useDispatch( coreStore );
	return (
		<ToolbarButton
			icon={ ! isRTL() ? redoIcon : undoIcon }
			label={ __( 'Redo' ) }
			shortcut={ displayShortcut.primaryShift( 'z' ) }
			// If there are no undo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasRedo }
			onClick={ hasRedo ? redo : undefined }
		/>
	);
}
