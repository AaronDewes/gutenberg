/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { CheckboxControl } from '@aarondewes/wp-components';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import PostPendingStatusCheck from './check';
import { store as editorStore } from '../../store';

export function PostPendingStatus( { status, onUpdateStatus } ) {
	const togglePendingStatus = () => {
		const updatedStatus = status === 'pending' ? 'draft' : 'pending';
		onUpdateStatus( updatedStatus );
	};

	return (
		<PostPendingStatusCheck>
			<CheckboxControl
				label={ __( 'Pending review' ) }
				checked={ status === 'pending' }
				onChange={ togglePendingStatus }
			/>
		</PostPendingStatusCheck>
	);
}

export default compose(
	withSelect( ( select ) => ( {
		status: select( editorStore ).getEditedPostAttribute( 'status' ),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		onUpdateStatus( status ) {
			dispatch( editorStore ).editPost( { status } );
		},
	} ) )
)( PostPendingStatus );
