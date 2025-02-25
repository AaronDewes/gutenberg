/**
 * External dependencies
 */
import { flow } from 'lodash';

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
import { store as editSiteStore } from '../../../store';

export default function FeatureToggle( {
	feature,
	label,
	info,
	messageActivated,
	messageDeactivated,
} ) {
	const speakMessage = () => {
		if ( isActive ) {
			speak( messageDeactivated || __( 'Feature deactivated' ) );
		} else {
			speak( messageActivated || __( 'Feature activated' ) );
		}
	};

	const isActive = useSelect( ( select ) => {
		return select( editSiteStore ).isFeatureActive( feature );
	}, [] );

	const { toggleFeature } = useDispatch( editSiteStore );

	return (
		<MenuItem
			icon={ isActive && check }
			isSelected={ isActive }
			onClick={ flow(
				toggleFeature.bind( null, feature ),
				speakMessage
			) }
			role="menuitemcheckbox"
			info={ info }
		>
			{ label }
		</MenuItem>
	);
}
