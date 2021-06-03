/**
 * WordPress dependencies
 */
import { PanelRow } from '@aarondewes/wp-components';
import {
	PostFormat as PostFormatForm,
	PostFormatCheck,
} from '@aarondewes/wp-editor';

export function PostFormat() {
	return (
		<PostFormatCheck>
			<PanelRow>
				<PostFormatForm />
			</PanelRow>
		</PostFormatCheck>
	);
}

export default PostFormat;
