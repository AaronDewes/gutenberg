/**
 * WordPress dependencies
 */
import { __, isRTL } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { displayShortcut } from '@aarondewes/wp-keycodes';
import { redo as redoIcon, undo as undoIcon } from '@aarondewes/wp-icons';
import { forwardRef } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function EditorHistoryRedo( props, ref ) {
	const hasRedo = useSelect(
		( select ) => select( editorStore ).hasEditorRedo(),
		[]
	);
	const { redo } = useDispatch( editorStore );
	return (
		<Button
			{ ...props }
			ref={ ref }
			icon={ ! isRTL() ? redoIcon : undoIcon }
			/* translators: button label text should, if possible, be under 16 characters. */
			label={ __( 'Redo' ) }
			shortcut={ displayShortcut.primaryShift( 'z' ) }
			// If there are no redo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasRedo }
			onClick={ hasRedo ? redo : undefined }
			className="editor-history__redo"
		/>
	);
}

export default forwardRef( EditorHistoryRedo );
