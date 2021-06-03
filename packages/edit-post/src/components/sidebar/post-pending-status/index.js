/**
 * WordPress dependencies
 */
import { PanelRow } from '@aarondewes/wp-components';
import {
	PostPendingStatus as PostPendingStatusForm,
	PostPendingStatusCheck,
} from '@aarondewes/wp-editor';

export function PostPendingStatus() {
	return (
		<PostPendingStatusCheck>
			<PanelRow>
				<PostPendingStatusForm />
			</PanelRow>
		</PostPendingStatusCheck>
	);
}

export default PostPendingStatus;
