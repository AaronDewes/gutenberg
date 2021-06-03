/**
 * WordPress dependencies
 */
import { __, isRTL } from '@aarondewes/wp-i18n';
import { ToolbarButton } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { undo as undoIcon, redo as redoIcon } from '@aarondewes/wp-icons';
import { displayShortcut } from '@aarondewes/wp-keycodes';
import { store as coreStore } from '@aarondewes/wp-core-data';

export default function UndoButton() {
	const hasUndo = useSelect( ( select ) => select( coreStore ).hasUndo() );
	const { undo } = useDispatch( coreStore );
	return (
		<ToolbarButton
			icon={ ! isRTL() ? undoIcon : redoIcon }
			label={ __( 'Undo' ) }
			shortcut={ displayShortcut.primary( 'z' ) }
			// If there are no undo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasUndo }
			onClick={ hasUndo ? undo : undefined }
		/>
	);
}
