/**
 * WordPress dependencies
 */
import { PanelBody } from '@aarondewes/wp-components';
import { PostLastRevision, PostLastRevisionCheck } from '@aarondewes/wp-editor';

function LastRevision() {
	return (
		<PostLastRevisionCheck>
			<PanelBody className="edit-post-last-revision__panel">
				<PostLastRevision />
			</PanelBody>
		</PostLastRevisionCheck>
	);
}

export default LastRevision;
