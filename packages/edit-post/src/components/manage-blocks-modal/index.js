/**
 * WordPress dependencies
 */
import { Modal } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import BlockManager from './manager';
import { store as editPostStore } from '../../store';

/**
 * Unique identifier for Manage Blocks modal.
 *
 * @type {string}
 */
const MODAL_NAME = 'edit-post/manage-blocks';

export function ManageBlocksModal( { isActive, closeModal } ) {
	if ( ! isActive ) {
		return null;
	}

	return (
		<Modal
			className="edit-post-manage-blocks-modal"
			title={ __( 'Block Manager' ) }
			closeLabel={ __( 'Close' ) }
			onRequestClose={ closeModal }
		>
			<BlockManager />
		</Modal>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const { isModalActive } = select( editPostStore );

		return {
			isActive: isModalActive( MODAL_NAME ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { closeModal } = dispatch( editPostStore );

		return {
			closeModal,
		};
	} ),
] )( ManageBlocksModal );
