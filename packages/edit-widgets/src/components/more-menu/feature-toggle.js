/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { check } from '@aarondewes/wp-icons';
import { speak } from '@aarondewes/wp-a11y';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../../store';

export default function FeatureToggle( {
	label,
	info,
	messageActivated,
	messageDeactivated,
	shortcut,
	feature,
} ) {
	const isActive = useSelect(
		( select ) =>
			select( editWidgetsStore ).__unstableIsFeatureActive( feature ),
		[ feature ]
	);
	const { __unstableToggleFeature: toggleFeature } = useDispatch(
		editWidgetsStore
	);
	const speakMessage = () => {
		if ( isActive ) {
			speak( messageDeactivated || __( 'Feature deactivated' ) );
		} else {
			speak( messageActivated || __( 'Feature activated' ) );
		}
	};

	return (
		<MenuItem
			icon={ isActive && check }
			isSelected={ isActive }
			onClick={ () => {
				toggleFeature( feature );
				speakMessage();
			} }
			role="menuitemcheckbox"
			info={ info }
			shortcut={ shortcut }
		>
			{ label }
		</MenuItem>
	);
}
