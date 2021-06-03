/**
 * WordPress dependencies
 */
import { MenuItem } from '@aarondewes/wp-components';
import { withDispatch } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

export function ManageBlocksMenuItem( { openModal } ) {
	return (
		<MenuItem
			onClick={ () => {
				openModal( 'edit-post/manage-blocks' );
			} }
		>
			{ __( 'Block Manager' ) }
		</MenuItem>
	);
}

export default withDispatch( ( dispatch ) => {
	const { openModal } = dispatch( editPostStore );

	return {
		openModal,
	};
} )( ManageBlocksMenuItem );
