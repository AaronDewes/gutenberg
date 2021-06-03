/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Button, PanelBody } from '@aarondewes/wp-components';

export default function DeleteMenu( { onDeleteMenu, isMenuBeingDeleted } ) {
	return (
		<PanelBody>
			<Button
				className="edit-navigation-inspector-additions__delete-menu-button"
				variant="secondary"
				isDestructive
				isBusy={ isMenuBeingDeleted }
				onClick={ () => {
					if (
						// eslint-disable-next-line no-alert
						window.confirm(
							__(
								'Are you sure you want to delete this navigation? This action cannot be undone.'
							)
						)
					) {
						onDeleteMenu();
					}
				} }
			>
				{ __( 'Delete menu' ) }
			</Button>
		</PanelBody>
	);
}
