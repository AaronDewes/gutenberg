/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useEffect } from '@aarondewes/wp-element';
import { useSelect } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Warns the user if there are unsaved changes before leaving the editor.
 * Compatible with Post Editor and Site Editor.
 *
 * @return {WPComponent} The component.
 */
export default function UnsavedChangesWarning() {
	const isDirty = useSelect( ( select ) => {
		return () => {
			const { __experimentalGetDirtyEntityRecords } = select( coreStore );
			const dirtyEntityRecords = __experimentalGetDirtyEntityRecords();
			return dirtyEntityRecords.length > 0;
		};
	}, [] );

	/**
	 * Warns the user if there are unsaved changes before leaving the editor.
	 *
	 * @param {Event} event `beforeunload` event.
	 *
	 * @return {?string} Warning prompt message, if unsaved changes exist.
	 */
	const warnIfUnsavedChanges = ( event ) => {
		// We need to call the selector directly in the listener to avoid race
		// conditions with `BrowserURL` where `componentDidUpdate` gets the
		// new value of `isEditedPostDirty` before this component does,
		// causing this component to incorrectly think a trashed post is still dirty.
		if ( isDirty() ) {
			event.returnValue = __(
				'You have unsaved changes. If you proceed, they will be lost.'
			);
			return event.returnValue;
		}
	};

	useEffect( () => {
		window.addEventListener( 'beforeunload', warnIfUnsavedChanges );

		return () => {
			window.removeEventListener( 'beforeunload', warnIfUnsavedChanges );
		};
	}, [] );

	return null;
}
