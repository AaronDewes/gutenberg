/**
 * WordPress dependencies
 */
import { Button } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose, useViewportMatch } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostSwitchToDraftButton( {
	isSaving,
	isPublished,
	isScheduled,
	onClick,
} ) {
	const isMobileViewport = useViewportMatch( 'small', '<' );

	if ( ! isPublished && ! isScheduled ) {
		return null;
	}

	const onSwitch = () => {
		let alertMessage;
		if ( isPublished ) {
			alertMessage = __(
				'Are you sure you want to unpublish this post?'
			);
		} else if ( isScheduled ) {
			alertMessage = __(
				'Are you sure you want to unschedule this post?'
			);
		}
		// eslint-disable-next-line no-alert
		if ( window.confirm( alertMessage ) ) {
			onClick();
		}
	};

	return (
		<Button
			className="editor-post-switch-to-draft"
			onClick={ onSwitch }
			disabled={ isSaving }
			variant="tertiary"
		>
			{ isMobileViewport ? __( 'Draft' ) : __( 'Switch to draft' ) }
		</Button>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const {
			isSavingPost,
			isCurrentPostPublished,
			isCurrentPostScheduled,
		} = select( editorStore );
		return {
			isSaving: isSavingPost(),
			isPublished: isCurrentPostPublished(),
			isScheduled: isCurrentPostScheduled(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost, savePost } = dispatch( editorStore );
		return {
			onClick: () => {
				editPost( { status: 'draft' } );
				savePost();
			},
		};
	} ),
] )( PostSwitchToDraftButton );
