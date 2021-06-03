/**
 * WordPress dependencies
 */
import { useEffect } from '@aarondewes/wp-element';
import {
	useShortcut,
	store as keyboardShortcutsStore,
} from '@aarondewes/wp-keyboard-shortcuts';
import { useDispatch } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';

function KeyboardShortcuts( { undo, redo, save } ) {
	useShortcut(
		'core/customize-widgets/undo',
		( event ) => {
			undo();
			event.preventDefault();
		},
		{ bindGlobal: true }
	);

	useShortcut(
		'core/customize-widgets/redo',
		( event ) => {
			redo();
			event.preventDefault();
		},
		{ bindGlobal: true }
	);

	useShortcut(
		'core/customize-widgets/save',
		( event ) => {
			event.preventDefault();
			save();
		},
		{ bindGlobal: true }
	);

	return null;
}

function KeyboardShortcutsRegister() {
	const { registerShortcut, unregisterShortcut } = useDispatch(
		keyboardShortcutsStore
	);

	useEffect( () => {
		registerShortcut( {
			name: 'core/customize-widgets/undo',
			category: 'global',
			description: __( 'Undo your last changes.' ),
			keyCombination: {
				modifier: 'primary',
				character: 'z',
			},
		} );

		registerShortcut( {
			name: 'core/customize-widgets/redo',
			category: 'global',
			description: __( 'Redo your last undo.' ),
			keyCombination: {
				modifier: 'primaryShift',
				character: 'z',
			},
		} );

		registerShortcut( {
			name: 'core/customize-widgets/save',
			category: 'global',
			description: __( 'Save your changes.' ),
			keyCombination: {
				modifier: 'primary',
				character: 's',
			},
		} );

		return () => {
			unregisterShortcut( 'core/customize-widgets/undo' );
			unregisterShortcut( 'core/customize-widgets/redo' );
			unregisterShortcut( 'core/customize-widgets/save' );
		};
	}, [ registerShortcut ] );

	return null;
}

KeyboardShortcuts.Register = KeyboardShortcutsRegister;
export default KeyboardShortcuts;
