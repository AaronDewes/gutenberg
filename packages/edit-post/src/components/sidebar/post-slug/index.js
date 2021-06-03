/**
 * WordPress dependencies
 */
import { PanelRow } from '@aarondewes/wp-components';
import { PostSlug as PostSlugForm, PostSlugCheck } from '@aarondewes/wp-editor';

export function PostSlug() {
	return (
		<PostSlugCheck>
			<PanelRow>
				<PostSlugForm />
			</PanelRow>
		</PostSlugCheck>
	);
}

export default PostSlug;
