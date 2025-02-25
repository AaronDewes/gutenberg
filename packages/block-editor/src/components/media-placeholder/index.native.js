/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { uniqWith } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@aarondewes/wp-i18n';
import {
	MediaUpload,
	MEDIA_TYPE_IMAGE,
	MEDIA_TYPE_VIDEO,
	MEDIA_TYPE_AUDIO,
} from '@aarondewes/wp-block-editor';
import { withPreferredColorScheme } from '@aarondewes/wp-compose';
import { useRef } from '@aarondewes/wp-element';
import { Icon, plusCircleFilled } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

// remove duplicates after gallery append
const dedupMedia = ( media ) =>
	uniqWith(
		media,
		( media1, media2 ) =>
			media1.id === media2.id || media1.url === media2.url
	);

function MediaPlaceholder( props ) {
	const {
		addToGallery,
		allowedTypes = [],
		labels = {},
		icon,
		onSelect,
		__experimentalOnlyMediaLibrary,
		isAppender,
		disableMediaButtons,
		getStylesFromColorScheme,
		multiple,
		value = [],
		children,
		height,
		backgroundColor,
		hideContent,
		autoOpenMediaUpload,
		onSelectURL,
	} = props;

	// use ref to keep media array current for callbacks during rerenders
	const mediaRef = useRef( value );
	mediaRef.current = value;

	// append and deduplicate media array for gallery use case
	const setMedia =
		multiple && addToGallery
			? ( selected ) =>
					onSelect(
						dedupMedia( [ ...mediaRef.current, ...selected ] )
					)
			: onSelect;

	const isOneType = allowedTypes.length === 1;
	const isImage = isOneType && allowedTypes.includes( MEDIA_TYPE_IMAGE );
	const isVideo = isOneType && allowedTypes.includes( MEDIA_TYPE_VIDEO );
	const isAudio = isOneType && allowedTypes.includes( MEDIA_TYPE_AUDIO );

	let placeholderTitle = labels.title;
	if ( placeholderTitle === undefined ) {
		placeholderTitle = __( 'Media' );
		if ( isImage ) {
			placeholderTitle = __( 'Image' );
		} else if ( isVideo ) {
			placeholderTitle = __( 'Video' );
		} else if ( isAudio ) {
			placeholderTitle = __( 'Audio' );
		}
	}

	let instructions = labels.instructions;
	if ( instructions === undefined ) {
		if ( isImage ) {
			instructions = __( 'ADD IMAGE' );
		} else if ( isVideo ) {
			instructions = __( 'ADD VIDEO' );
		} else if ( isAudio ) {
			instructions = __( 'ADD AUDIO' );
		} else {
			instructions = __( 'ADD IMAGE OR VIDEO' );
		}
	}

	let accessibilityHint = __( 'Double tap to select' );
	if ( isImage ) {
		accessibilityHint = __( 'Double tap to select an image' );
	} else if ( isVideo ) {
		accessibilityHint = __( 'Double tap to select a video' );
	} else if ( isAudio ) {
		accessibilityHint = __( 'Double tap to select an audio file' );
	}

	const emptyStateTitleStyle = getStylesFromColorScheme(
		styles.emptyStateTitle,
		styles.emptyStateTitleDark
	);
	const addMediaButtonStyle = getStylesFromColorScheme(
		styles.addMediaButton,
		styles.addMediaButtonDark
	);

	const renderContent = () => {
		if ( isAppender === undefined || ! isAppender ) {
			return (
				<>
					<View style={ styles.modalIcon }>{ icon }</View>
					<Text style={ emptyStateTitleStyle }>
						{ placeholderTitle }
					</Text>
					{ children }
					<Text style={ styles.emptyStateDescription }>
						{ instructions }
					</Text>
				</>
			);
		} else if ( isAppender && ! disableMediaButtons ) {
			return (
				<Icon
					icon={ plusCircleFilled }
					style={ addMediaButtonStyle }
					color={ addMediaButtonStyle.color }
					size={ addMediaButtonStyle.size }
				/>
			);
		}
	};

	if ( isAppender && disableMediaButtons ) {
		return null;
	}

	const appenderStyle = getStylesFromColorScheme(
		styles.appender,
		styles.appenderDark
	);
	const emptyStateContainerStyle = getStylesFromColorScheme(
		styles.emptyStateContainer,
		styles.emptyStateContainerDark
	);

	return (
		<View style={ { flex: 1 } }>
			<MediaUpload
				allowedTypes={ allowedTypes }
				onSelect={ setMedia }
				onSelectURL={ onSelectURL }
				__experimentalOnlyMediaLibrary={
					__experimentalOnlyMediaLibrary
				}
				multiple={ multiple }
				isReplacingMedia={ false }
				autoOpen={ autoOpenMediaUpload }
				render={ ( { open, getMediaOptions } ) => {
					return (
						<TouchableWithoutFeedback
							accessibilityLabel={ sprintf(
								/* translators: accessibility text for the media block empty state. %s: media type */
								__( '%s block. Empty' ),
								placeholderTitle
							) }
							accessibilityRole={ 'button' }
							accessibilityHint={ accessibilityHint }
							onPress={ ( event ) => {
								props.onFocus( event );
								open();
							} }
						>
							<View
								style={ [
									[
										emptyStateContainerStyle,
										height && { height },
										backgroundColor && { backgroundColor },
									],
									isAppender && appenderStyle,
								] }
							>
								{ getMediaOptions() }
								{ ! hideContent && renderContent() }
							</View>
						</TouchableWithoutFeedback>
					);
				} }
			/>
		</View>
	);
}

export default withPreferredColorScheme( MediaPlaceholder );
