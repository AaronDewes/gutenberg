/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { PanelRow, Dropdown, Button } from '@aarondewes/wp-components';
import {
	PostVisibility as PostVisibilityForm,
	PostVisibilityLabel,
	PostVisibilityCheck,
} from '@aarondewes/wp-editor';

export function PostVisibility() {
	return (
		<PostVisibilityCheck
			render={ ( { canEdit } ) => (
				<PanelRow className="edit-post-post-visibility">
					<span>{ __( 'Visibility' ) }</span>
					{ ! canEdit && (
						<span>
							<PostVisibilityLabel />
						</span>
					) }
					{ canEdit && (
						<Dropdown
							position="bottom left"
							contentClassName="edit-post-post-visibility__dialog"
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									aria-expanded={ isOpen }
									className="edit-post-post-visibility__toggle"
									onClick={ onToggle }
									variant="tertiary"
								>
									<PostVisibilityLabel />
								</Button>
							) }
							renderContent={ () => <PostVisibilityForm /> }
						/>
					) }
				</PanelRow>
			) }
		/>
	);
}

export default PostVisibility;
