/**
 * External dependencies
 */
import { TouchableWithoutFeedback, View, Platform } from 'react-native';

/**
 * WordPress dependencies
 */
import { Icon } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import { MediaEdit } from '../media-edit';
import SvgIconCustomize from './icon-customize';
import styles from './style.scss';

const accessibilityHint =
	Platform.OS === 'ios'
		? __(
				'Double tap to open Action Sheet to edit, replace, or clear the image'
		  )
		: __(
				'Double tap to open Bottom Sheet to edit, replace, or clear the image'
		  );

const ImageEditingButton = ( {
	onSelectMediaUploadOption,
	openMediaOptions,
	pickerOptions,
	url,
} ) => {
	return (
		<MediaEdit
			onSelect={ onSelectMediaUploadOption }
			source={ { uri: url } }
			openReplaceMediaOptions={ openMediaOptions }
			render={ ( { open, mediaOptions } ) => (
				<TouchableWithoutFeedback
					accessibilityHint={ accessibilityHint }
					accessibilityLabel={ __( 'Edit image' ) }
					accessibilityRole={ 'button' }
					onPress={ open }
				>
					<View style={ styles.editContainer }>
						<View style={ styles.edit }>
							{ mediaOptions() }
							<Icon
								size={ 16 }
								icon={ SvgIconCustomize }
								{ ...styles.iconCustomise }
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			) }
			pickerOptions={ pickerOptions }
		/>
	);
};

export default ImageEditingButton;
