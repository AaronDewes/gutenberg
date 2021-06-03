/**
 * External dependencies
 */

import { TouchableOpacity, Text, Linking } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { external, Icon } from '@aarondewes/wp-icons';

export function ExternalLink( { href, children } ) {
	return (
		<TouchableOpacity
			onPress={ () => Linking.openURL( href ) }
			accessibilityLabel={ __( 'Open link in a browser' ) }
		>
			<Text>{ children }</Text>
			<Icon icon={ external } />
		</TouchableOpacity>
	);
}

export default ExternalLink;
