/**
 * WordPress dependencies
 */
import { PanelRow } from '@aarondewes/wp-components';
import {
	PostAuthor as PostAuthorForm,
	PostAuthorCheck,
} from '@aarondewes/wp-editor';

export function PostAuthor() {
	return (
		<PostAuthorCheck>
			<PanelRow>
				<PostAuthorForm />
			</PanelRow>
		</PostAuthorCheck>
	);
}

export default PostAuthor;
