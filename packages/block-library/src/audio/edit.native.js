/**
 * External dependencies
 */
import { TouchableWithoutFeedback } from 'react-native';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { View } from '@aarondewes/wp-primitives';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
	AudioPlayer,
} from '@aarondewes/wp-components';
import {
	BlockCaption,
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadProgress,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { __, sprintf } from '@aarondewes/wp-i18n';
import { audio as icon, replace } from '@aarondewes/wp-icons';
import { useState } from '@aarondewes/wp-element';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { store as noticesStore } from '@aarondewes/wp-notices';
import { isURL } from '@aarondewes/wp-url';

/**
 * Internal dependencies
 */
import styles from './style.scss';

const ALLOWED_MEDIA_TYPES = [ 'audio' ];

function AudioEdit( {
	attributes,
	setAttributes,
	isSelected,
	insertBlocksAfter,
	onFocus,
	onBlur,
	clientId,
} ) {
	const { id, autoplay, loop, preload, src } = attributes;

	const [ isCaptionSelected, setIsCaptionSelected ] = useState( false );

	const onFileChange = ( { mediaId, mediaUrl } ) => {
		setAttributes( { id: mediaId, src: mediaUrl } );
	};

	const { wasBlockJustInserted } = useSelect( ( select ) => ( {
		wasBlockJustInserted: select( blockEditorStore ).wasBlockJustInserted(
			clientId,
			'inserter_menu'
		),
	} ) );

	const { createErrorNotice } = useDispatch( noticesStore );

	const onError = () => {
		createErrorNotice( __( 'Failed to insert audio file.' ) );
	};

	function toggleAttribute( attribute ) {
		return ( newValue ) => {
			setAttributes( { [ attribute ]: newValue } );
		};
	}

	function onSelectURL( newSrc ) {
		if ( newSrc !== src ) {
			if ( isURL( newSrc ) ) {
				setAttributes( { src: newSrc, id: undefined } );
			} else {
				createErrorNotice( __( 'Invalid URL. Audio file not found.' ) );
			}
		}
	}

	function onSelectAudio( media ) {
		if ( ! media || ! media.url ) {
			// in this case there was an error and we should continue in the editing state
			// previous attributes should be removed because they may be temporary blob urls
			setAttributes( { src: undefined, id: undefined } );
			return;
		}
		// sets the block's attribute and updates the edit component from the
		// selected media, then switches off the editing UI
		setAttributes( { src: media.url, id: media.id } );
	}

	function onAudioPress() {
		setIsCaptionSelected( false );
	}

	function onFocusCaption() {
		if ( ! isCaptionSelected ) {
			setIsCaptionSelected( true );
		}
	}

	if ( ! src ) {
		return (
			<View>
				<MediaPlaceholder
					icon={ <BlockIcon icon={ icon } /> }
					onSelect={ onSelectAudio }
					onSelectURL={ onSelectURL }
					accept="audio/*"
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={ attributes }
					onFocus={ onFocus }
					autoOpenMediaUpload={ isSelected && wasBlockJustInserted }
				/>
			</View>
		);
	}

	function getBlockControls( open ) {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						title={ __( 'Replace audio' ) }
						icon={ replace }
						onClick={ open }
					/>
				</ToolbarGroup>
			</BlockControls>
		);
	}

	function getBlockUI( open, getMediaOptions ) {
		return (
			<MediaUploadProgress
				mediaId={ id }
				onFinishMediaUploadWithSuccess={ onFileChange }
				onFinishMediaUploadWithFailure={ onError }
				onMediaUploadStateReset={ onFileChange }
				containerStyle={ styles.progressContainer }
				progressBarStyle={ styles.progressBar }
				spinnerStyle={ styles.spinner }
				renderContent={ ( {
					isUploadInProgress,
					isUploadFailed,
					retryMessage,
				} ) => {
					return (
						<>
							{ ! isCaptionSelected &&
								! isUploadInProgress &&
								getBlockControls( open ) }
							{ getMediaOptions() }
							<AudioPlayer
								isUploadInProgress={ isUploadInProgress }
								isUploadFailed={ isUploadFailed }
								retryMessage={ retryMessage }
								attributes={ attributes }
								isSelected={ isSelected }
							/>
						</>
					);
				} }
			/>
		);
	}

	return (
		<TouchableWithoutFeedback
			accessible={ ! isSelected }
			onPress={ onAudioPress }
			disabled={ ! isSelected }
		>
			<View>
				<InspectorControls>
					<PanelBody title={ __( 'Audio settings' ) }>
						<ToggleControl
							label={ __( 'Autoplay' ) }
							onChange={ toggleAttribute( 'autoplay' ) }
							checked={ autoplay }
							help={ __(
								'Autoplay may cause usability issues for some users.'
							) }
						/>
						<ToggleControl
							label={ __( 'Loop' ) }
							onChange={ toggleAttribute( 'loop' ) }
							checked={ loop }
						/>
						<SelectControl
							label={ __( 'Preload' ) }
							value={ preload || '' }
							// `undefined` is required for the preload attribute to be unset.
							onChange={ ( value ) =>
								setAttributes( {
									preload: value || undefined,
								} )
							}
							options={ [
								{ value: '', label: __( 'Browser default' ) },
								{ value: 'auto', label: __( 'Auto' ) },
								{ value: 'metadata', label: __( 'Metadata' ) },
								{ value: 'none', label: __( 'None' ) },
							] }
							hideCancelButton={ true }
						/>
					</PanelBody>
				</InspectorControls>
				<MediaUpload
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					isReplacingMedia={ true }
					onSelect={ onSelectAudio }
					onSelectURL={ onSelectURL }
					render={ ( { open, getMediaOptions } ) => {
						return getBlockUI( open, getMediaOptions );
					} }
				/>
				<BlockCaption
					accessible={ true }
					accessibilityLabelCreator={ ( caption ) =>
						isEmpty( caption )
							? /* translators: accessibility text. Empty Audio caption. */
							  __( 'Audio caption. Empty' )
							: sprintf(
									/* translators: accessibility text. %s: Audio caption. */
									__( 'Audio caption. %s' ),
									caption
							  )
					}
					clientId={ clientId }
					isSelected={ isCaptionSelected }
					onFocus={ onFocusCaption }
					onBlur={ onBlur }
					insertBlocksAfter={ insertBlocksAfter }
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}
export default AudioEdit;
