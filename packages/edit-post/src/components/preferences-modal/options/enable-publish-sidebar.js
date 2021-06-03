/**
 * WordPress dependencies
 */
import { compose } from '@aarondewes/wp-compose';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { ifViewportMatches } from '@aarondewes/wp-viewport';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import BaseOption from './base';

export default compose(
	withSelect( ( select ) => ( {
		isChecked: select( editorStore ).isPublishSidebarEnabled(),
	} ) ),
	withDispatch( ( dispatch ) => {
		const { enablePublishSidebar, disablePublishSidebar } = dispatch(
			editorStore
		);
		return {
			onChange: ( isEnabled ) =>
				isEnabled ? enablePublishSidebar() : disablePublishSidebar(),
		};
	} ),
	// In < medium viewports we override this option and always show the publish sidebar.
	// See the edit-post's header component for the specific logic.
	ifViewportMatches( 'medium' )
)( BaseOption );
