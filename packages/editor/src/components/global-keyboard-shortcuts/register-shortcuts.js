/**
 * WordPress dependencies
 */
import { useEffect } from '@aarondewes/wp-element';
import { useDispatch } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { BlockEditorKeyboardShortcuts } from '@aarondewes/wp-block-editor';
import { store as keyboardShortcutsStore } from '@aarondewes/wp-keyboard-shortcuts';

function EditorKeyboardShortcutsRegister() {
	// Registering the shortcuts
	const { registerShortcut } = useDispatch( keyboardShortcutsStore );
	useEffect( () => {
		registerShortcut( {
			name: 'core/editor/save',
			category: 'global',
			description: __( 'Save your changes.' ),
			keyCombination: {
				modifier: 'primary',
				character: 's',
			},
		} );

		registerShortcut( {
			name: 'core/editor/undo',
			category: 'global',
			description: __( 'Undo your last changes.' ),
			keyCombination: {
				modifier: 'primary',
				character: 'z',
			},
		} );

		registerShortcut( {
			name: 'core/editor/redo',
			category: 'global',
			description: __( 'Redo your last undo.' ),
			keyCombination: {
				modifier: 'primaryShift',
				character: 'z',
			},
		} );
	}, [ registerShortcut ] );

	return <BlockEditorKeyboardShortcuts.Register />;
}

export default EditorKeyboardShortcutsRegister;
