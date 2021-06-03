/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { Button } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../../store';

export default function SaveButton( { navigationPost } ) {
	const { isDirty } = useSelect( ( select ) => {
		const { __experimentalGetDirtyEntityRecords } = select( coreStore );
		const dirtyEntityRecords = __experimentalGetDirtyEntityRecords();

		return {
			isDirty: dirtyEntityRecords.length > 0,
		};
	}, [] );

	const { saveNavigationPost } = useDispatch( editNavigationStore );

	const disabled = ! isDirty || ! navigationPost;

	return (
		<Button
			className="edit-navigation-toolbar__save-button"
			variant="primary"
			onClick={ () => {
				saveNavigationPost( navigationPost );
			} }
			disabled={ disabled }
		>
			{ __( 'Save' ) }
		</Button>
	);
}
