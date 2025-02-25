/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { PanelBody, PanelRow } from '@aarondewes/wp-components';
import {
	PostComments,
	PostPingbacks,
	PostTypeSupportCheck,
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
const PANEL_NAME = 'discussion-panel';

function DiscussionPanel( { isEnabled, isOpened, onTogglePanel } ) {
	if ( ! isEnabled ) {
		return null;
	}

	return (
		<PostTypeSupportCheck supportKeys={ [ 'comments', 'trackbacks' ] }>
			<PanelBody
				title={ __( 'Discussion' ) }
				opened={ isOpened }
				onToggle={ onTogglePanel }
			>
				<PostTypeSupportCheck supportKeys="comments">
					<PanelRow>
						<PostComments />
					</PanelRow>
				</PostTypeSupportCheck>

				<PostTypeSupportCheck supportKeys="trackbacks">
					<PanelRow>
						<PostPingbacks />
					</PanelRow>
				</PostTypeSupportCheck>
			</PanelBody>
		</PostTypeSupportCheck>
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
] )( DiscussionPanel );
