/**
 * WordPress dependencies
 */
import { useRefEffect } from '@aarondewes/wp-compose';
import { isKeyboardEvent } from '@aarondewes/wp-keycodes';

/**
 * Hook to prevent default behaviors for key combinations otherwise handled
 * internally by RichText.
 *
 * @return {import('react').RefObject} The component to be rendered.
 */
export function useRemoveBrowserShortcuts() {
	return useRefEffect( ( node ) => {
		function onKeydown( event ) {
			if (
				isKeyboardEvent.primary( event, 'z' ) ||
				isKeyboardEvent.primary( event, 'y' ) ||
				isKeyboardEvent.primaryShift( event, 'z' )
			) {
				event.preventDefault();
			}
		}
		node.addEventListener( 'keydown', onKeydown );
		return () => {
			node.addEventListener( 'keydown', onKeydown );
		};
	}, [] );
}
