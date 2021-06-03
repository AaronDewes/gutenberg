/**
 * WordPress dependencies
 */
import { PanelRow } from '@aarondewes/wp-components';
import { PostTrash as PostTrashLink, PostTrashCheck } from '@aarondewes/wp-editor';

export default function PostTrash() {
	return (
		<PostTrashCheck>
			<PanelRow>
				<PostTrashLink />
			</PanelRow>
		</PostTrashCheck>
	);
}
