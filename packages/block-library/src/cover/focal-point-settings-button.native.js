/**
 * External dependencies
 */
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Icon, BottomSheet } from '@aarondewes/wp-components';
import { blockSettingsScreens } from '@aarondewes/wp-block-editor';
import { chevronRight } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import styles from './style.scss';

function FocalPointSettingsButton( {
	disabled,
	focalPoint,
	onFocalPointChange,
	url,
} ) {
	const navigation = useNavigation();
	return (
		<BottomSheet.Cell
			customActionButton
			disabled={ disabled }
			labelStyle={ disabled && styles.dimmedActionButton }
			leftAlign
			label={ __( 'Edit focal point' ) }
			onPress={ () => {
				navigation.navigate( blockSettingsScreens.focalPoint, {
					focalPoint,
					onFocalPointChange,
					url,
				} );
			} }
		>
			{ /*
			 * Wrapper View element used around Icon as workaround for SVG opacity
			 * issue: https://git.io/JtuXD
			 */ }
			<View style={ disabled && styles.dimmedActionButton }>
				<Icon icon={ chevronRight } />
			</View>
		</BottomSheet.Cell>
	);
}

export default FocalPointSettingsButton;
