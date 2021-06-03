/**
 * WordPress dependencies
 */
import { useState } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { withSelect } from '@aarondewes/wp-data';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import BaseOption from './base';

export function CustomFieldsConfirmation( { willEnable } ) {
	const [ isReloading, setIsReloading ] = useState( false );

	return (
		<>
			<p className="edit-post-preferences-modal__custom-fields-confirmation-message">
				{ __(
					'A page reload is required for this change. Make sure your content is saved before reloading.'
				) }
			</p>
			<Button
				className="edit-post-preferences-modal__custom-fields-confirmation-button"
				variant="secondary"
				isBusy={ isReloading }
				disabled={ isReloading }
				onClick={ () => {
					setIsReloading( true );
					document
						.getElementById( 'toggle-custom-fields-form' )
						.submit();
				} }
			>
				{ willEnable
					? __( 'Enable & Reload' )
					: __( 'Disable & Reload' ) }
			</Button>
		</>
	);
}

export function EnableCustomFieldsOption( { label, areCustomFieldsEnabled } ) {
	const [ isChecked, setIsChecked ] = useState( areCustomFieldsEnabled );

	return (
		<BaseOption
			label={ label }
			isChecked={ isChecked }
			onChange={ setIsChecked }
		>
			{ isChecked !== areCustomFieldsEnabled && (
				<CustomFieldsConfirmation willEnable={ isChecked } />
			) }
		</BaseOption>
	);
}

export default withSelect( ( select ) => ( {
	areCustomFieldsEnabled: !! select( editorStore ).getEditorSettings()
		.enableCustomFields,
} ) )( EnableCustomFieldsOption );
