/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

export default function WelcomeGuideMenuItem() {
	const isTemplateMode = useSelect(
		( select ) => select( editPostStore ).isEditingTemplate(),
		[]
	);
	const { toggleFeature } = useDispatch( editPostStore );

	return (
		<MenuItem
			onClick={ () =>
				toggleFeature(
					isTemplateMode ? 'welcomeGuideTemplate' : 'welcomeGuide'
				)
			}
		>
			{ __( 'Welcome Guide' ) }
		</MenuItem>
	);
}
