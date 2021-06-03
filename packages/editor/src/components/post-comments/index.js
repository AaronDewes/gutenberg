/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { CheckboxControl } from '@aarondewes/wp-components';
import { compose } from '@aarondewes/wp-compose';
import { withSelect, withDispatch } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostComments( { commentStatus = 'open', ...props } ) {
	const onToggleComments = () =>
		props.editPost( {
			comment_status: commentStatus === 'open' ? 'closed' : 'open',
		} );

	return (
		<CheckboxControl
			label={ __( 'Allow comments' ) }
			checked={ commentStatus === 'open' }
			onChange={ onToggleComments }
		/>
	);
}

export default compose( [
	withSelect( ( select ) => {
		return {
			commentStatus: select( editorStore ).getEditedPostAttribute(
				'comment_status'
			),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		editPost: dispatch( editorStore ).editPost,
	} ) ),
] )( PostComments );
