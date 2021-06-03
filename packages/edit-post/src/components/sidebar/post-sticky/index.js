/**
 * WordPress dependencies
 */
import { PanelRow } from '@aarondewes/wp-components';
import {
	PostSticky as PostStickyForm,
	PostStickyCheck,
} from '@aarondewes/wp-editor';

export function PostSticky() {
	return (
		<PostStickyCheck>
			<PanelRow>
				<PostStickyForm />
			</PanelRow>
		</PostStickyCheck>
	);
}

export default PostSticky;
