/**
 * WordPress dependencies
 */
import { Button } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { useDispatch, useSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../../store';

function SaveButton() {
	const { hasEditedWidgetAreaIds, isSaving } = useSelect( ( select ) => {
		const { getEditedWidgetAreas, isSavingWidgetAreas } = select(
			editWidgetsStore
		);

		return {
			hasEditedWidgetAreaIds: getEditedWidgetAreas()?.length > 0,
			isSaving: isSavingWidgetAreas(),
		};
	}, [] );
	const { saveEditedWidgetAreas } = useDispatch( editWidgetsStore );

	return (
		<Button
			variant="primary"
			isBusy={ isSaving }
			aria-disabled={ isSaving }
			onClick={ isSaving ? undefined : saveEditedWidgetAreas }
			disabled={ ! hasEditedWidgetAreaIds }
		>
			{ isSaving ? __( 'Saving…' ) : __( 'Update' ) }
		</Button>
	);
}

export default SaveButton;
