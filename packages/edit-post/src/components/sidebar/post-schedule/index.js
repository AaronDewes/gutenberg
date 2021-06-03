/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { PanelRow, Dropdown, Button } from '@aarondewes/wp-components';
import { useRef } from '@aarondewes/wp-element';
import {
	PostSchedule as PostScheduleForm,
	PostScheduleLabel,
	PostScheduleCheck,
} from '@aarondewes/wp-editor';

export function PostSchedule() {
	const anchorRef = useRef();

	return (
		<PostScheduleCheck>
			<PanelRow className="edit-post-post-schedule" ref={ anchorRef }>
				<span>{ __( 'Publish' ) }</span>
				<Dropdown
					popoverProps={ { anchorRef: anchorRef.current } }
					position="bottom left"
					contentClassName="edit-post-post-schedule__dialog"
					renderToggle={ ( { onToggle, isOpen } ) => (
						<>
							<Button
								className="edit-post-post-schedule__toggle"
								onClick={ onToggle }
								aria-expanded={ isOpen }
								variant="tertiary"
							>
								<PostScheduleLabel />
							</Button>
						</>
					) }
					renderContent={ () => <PostScheduleForm /> }
				/>
			</PanelRow>
		</PostScheduleCheck>
	);
}

export default PostSchedule;
