/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { PanelBody } from '@aarondewes/wp-components';
import {
	PostExcerpt as PostExcerptForm,
	PostExcerptCheck,
} from '@aarondewes/wp-editor';
import { compose } from '@aarondewes/wp-compose';
import { withSelect, withDispatch } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

/**
 * Module Constants
 */
const PANEL_NAME = 'post-excerpt';

function PostExcerpt( { isEnabled, isOpened, onTogglePanel } ) {
	if ( ! isEnabled ) {
		return null;
	}

	return (
		<PostExcerptCheck>
			<PanelBody
				title={ __( 'Excerpt' ) }
				opened={ isOpened }
				onToggle={ onTogglePanel }
			>
				<PostExcerptForm />
			</PanelBody>
		</PostExcerptCheck>
	);
}

export default compose( [
	withSelect( ( select ) => {
		return {
			isEnabled: select( editPostStore ).isEditorPanelEnabled(
				PANEL_NAME
			),
			isOpened: select( editPostStore ).isEditorPanelOpened( PANEL_NAME ),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onTogglePanel() {
			return dispatch( editPostStore ).toggleEditorPanelOpened(
				PANEL_NAME
			);
		},
	} ) ),
] )( PostExcerpt );
