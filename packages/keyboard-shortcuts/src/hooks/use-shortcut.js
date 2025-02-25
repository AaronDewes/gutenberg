/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { useKeyboardShortcut } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as keyboardShortcutsStore } from '../store';

/**
 * Attach a keyboard shortcut handler.
 *
 * @param {string} name       Shortcut name.
 * @param {Function} callback Shortcut callback.
 * @param {Object} options    Shortcut options.
 */
function useShortcut( name, callback, options ) {
	const shortcuts = useSelect(
		( select ) => {
			return select(
				keyboardShortcutsStore
			).getAllShortcutRawKeyCombinations( name );
		},
		[ name ]
	);

	useKeyboardShortcut( shortcuts, callback, options );
}

export default useShortcut;
