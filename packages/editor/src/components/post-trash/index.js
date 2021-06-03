/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostTrash( { isNew, postId, postType, ...props } ) {
	if ( isNew || ! postId ) {
		return null;
	}

	const onClick = () => props.trashPost( postId, postType );

	return (
		<Button
			className="editor-post-trash"
			isDestructive
			variant="tertiary"
			onClick={ onClick }
		>
			{ __( 'Move to trash' ) }
		</Button>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const {
			isEditedPostNew,
			getCurrentPostId,
			getCurrentPostType,
		} = select( editorStore );
		return {
			isNew: isEditedPostNew(),
			postId: getCurrentPostId(),
			postType: getCurrentPostType(),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		trashPost: dispatch( editorStore ).trashPost,
	} ) ),
] )( PostTrash );
