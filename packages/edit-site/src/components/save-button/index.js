/**
 * External dependencies
 */
import { some } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { Button } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { store as coreStore } from '@aarondewes/wp-core-data';

export default function SaveButton( {
	openEntitiesSavedStates,
	isEntitiesSavedStatesOpen,
} ) {
	const { isDirty, isSaving } = useSelect( ( select ) => {
		const {
			__experimentalGetDirtyEntityRecords,
			isSavingEntityRecord,
		} = select( coreStore );
		const dirtyEntityRecords = __experimentalGetDirtyEntityRecords();
		return {
			isDirty: dirtyEntityRecords.length > 0,
			isSaving: some( dirtyEntityRecords, ( record ) =>
				isSavingEntityRecord( record.kind, record.name, record.key )
			),
		};
	} );

	const disabled = ! isDirty || isSaving;

	return (
		<>
			<Button
				variant="primary"
				className="edit-site-save-button__button"
				aria-disabled={ disabled }
				aria-expanded={ isEntitiesSavedStatesOpen }
				disabled={ disabled }
				isBusy={ isSaving }
				onClick={ disabled ? undefined : openEntitiesSavedStates }
			>
				{ __( 'Save' ) }
			</Button>
		</>
	);
}
