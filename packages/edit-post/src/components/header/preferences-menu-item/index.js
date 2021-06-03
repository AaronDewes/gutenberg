/**
 * WordPress dependencies
 */
import { useDispatch } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { MenuItem } from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

export default function PreferencesMenuItem() {
	const { openModal } = useDispatch( editPostStore );
	return (
		<MenuItem
			onClick={ () => {
				openModal( 'edit-post/preferences' );
			} }
		>
			{ __( 'Preferences' ) }
		</MenuItem>
	);
}
