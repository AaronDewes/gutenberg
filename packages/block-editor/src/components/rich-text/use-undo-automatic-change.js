/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { useRefEffect } from '@aarondewes/wp-compose';
import { BACKSPACE, DELETE, ESCAPE } from '@aarondewes/wp-keycodes';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

export function useUndoAutomaticChange() {
	const { didAutomaticChange, getSettings } = useSelect( blockEditorStore );
	return useRefEffect( ( element ) => {
		function onKeyDown( event ) {
			const { keyCode } = event;

			if (
				keyCode !== DELETE &&
				keyCode !== BACKSPACE &&
				keyCode !== ESCAPE
			) {
				return;
			}

			if ( ! didAutomaticChange() ) {
				return;
			}

			event.preventDefault();
			getSettings().__experimentalUndo();
		}

		element.addEventListener( 'keydown', onKeyDown );
		return () => {
			element.removeEventListener( 'keydown', onKeyDown );
		};
	}, [] );
}
