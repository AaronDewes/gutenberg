/**
 * External dependencies
 */
import { flow } from 'lodash';

/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';
import { MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { check } from '@aarondewes/wp-icons';
import { speak } from '@aarondewes/wp-a11y';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

function FeatureToggle( {
	onToggle,
	isActive,
	label,
	info,
	messageActivated,
	messageDeactivated,
	shortcut,
} ) {
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
			onClick={ flow( onToggle, speakMessage ) }
			role="menuitemcheckbox"
			info={ info }
			shortcut={ shortcut }
		>
			{ label }
		</MenuItem>
	);
}

export default compose( [
	withSelect( ( select, { feature } ) => ( {
		isActive: select( editPostStore ).isFeatureActive( feature ),
	} ) ),
	withDispatch( ( dispatch, ownProps ) => ( {
		onToggle() {
			dispatch( editPostStore ).toggleFeature( ownProps.feature );
		},
	} ) ),
] )( FeatureToggle );
