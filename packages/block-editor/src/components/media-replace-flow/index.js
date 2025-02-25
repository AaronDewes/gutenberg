/**
 * External dependencies
 */
import { uniqueId, noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState, createRef, renderToString } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { speak } from '@aarondewes/wp-a11y';
import {
	FormFileUpload,
	NavigableMenu,
	MenuItem,
	ToolbarButton,
	Dropdown,
	withFilters,
} from '@aarondewes/wp-components';
import { withDispatch, useSelect } from '@aarondewes/wp-data';
import { DOWN, TAB, ESCAPE } from '@aarondewes/wp-keycodes';
import { compose } from '@aarondewes/wp-compose';
import { upload, media as mediaIcon } from '@aarondewes/wp-icons';
import { store as noticesStore } from '@aarondewes/wp-notices';

/**
 * Internal dependencies
 */
import MediaUpload from '../media-upload';
import MediaUploadCheck from '../media-upload/check';
import LinkControl from '../link-control';
import { store as blockEditorStore } from '../../store';

const MediaReplaceFlow = ( {
	mediaURL,
	mediaId,
	allowedTypes,
	accept,
	onSelect,
	onSelectURL,
	onFilesUpload = noop,
	name = __( 'Replace' ),
	createNotice,
	removeNotice,
} ) => {
	const [ mediaURLValue, setMediaURLValue ] = useState( mediaURL );
	const mediaUpload = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().mediaUpload;
	}, [] );
	const editMediaButtonRef = createRef();
	const errorNoticeID = uniqueId(
		'block-editor/media-replace-flow/error-notice/'
	);

	const onError = ( message ) => {
		const errorElement = document.createElement( 'div' );
		errorElement.innerHTML = renderToString( message );
		// The default error contains some HTML that,
		// for example, makes the filename bold.
		// The notice, by default, accepts strings only and so
		// we need to remove the html from the error.
		const renderMsg =
			errorElement.textContent || errorElement.innerText || '';
		// We need to set a timeout for showing the notice
		// so that VoiceOver and possibly other screen readers
		// can announce the error afer the toolbar button
		// regains focus once the upload dialog closes.
		// Otherwise VO simply skips over the notice and announces
		// the focused element and the open menu.
		setTimeout( () => {
			createNotice( 'error', renderMsg, {
				speak: true,
				id: errorNoticeID,
				isDismissible: true,
			} );
		}, 1000 );
	};

	const selectMedia = ( media ) => {
		onSelect( media );
		setMediaURLValue( media.url );
		speak( __( 'The media file has been replaced' ) );
		removeNotice( errorNoticeID );
	};

	const selectURL = ( newURL ) => {
		onSelectURL( newURL );
	};

	const uploadFiles = ( event ) => {
		const files = event.target.files;
		onFilesUpload( files );
		const setMedia = ( [ media ] ) => {
			selectMedia( media );
		};
		mediaUpload( {
			allowedTypes,
			filesList: files,
			onFileChange: setMedia,
			onError,
		} );
	};

	const openOnArrowDown = ( event ) => {
		if ( event.keyCode === DOWN ) {
			event.preventDefault();
			event.stopPropagation();
			event.target.click();
		}
	};

	const POPOVER_PROPS = {
		isAlternate: true,
	};

	return (
		<Dropdown
			popoverProps={ POPOVER_PROPS }
			contentClassName="block-editor-media-replace-flow__options"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<ToolbarButton
					ref={ editMediaButtonRef }
					aria-expanded={ isOpen }
					aria-haspopup="true"
					onClick={ onToggle }
					onKeyDown={ openOnArrowDown }
				>
					{ name }
				</ToolbarButton>
			) }
			renderContent={ ( { onClose } ) => (
				<>
					<NavigableMenu className="block-editor-media-replace-flow__media-upload-menu">
						<MediaUpload
							value={ mediaId }
							onSelect={ ( media ) => selectMedia( media ) }
							allowedTypes={ allowedTypes }
							render={ ( { open } ) => (
								<MenuItem icon={ mediaIcon } onClick={ open }>
									{ __( 'Open Media Library' ) }
								</MenuItem>
							) }
						/>
						<MediaUploadCheck>
							<FormFileUpload
								onChange={ ( event ) => {
									uploadFiles( event, onClose );
								} }
								accept={ accept }
								render={ ( { openFileDialog } ) => {
									return (
										<MenuItem
											icon={ upload }
											onClick={ () => {
												openFileDialog();
											} }
										>
											{ __( 'Upload' ) }
										</MenuItem>
									);
								} }
							/>
						</MediaUploadCheck>
					</NavigableMenu>
					{ onSelectURL && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
						<form
							className="block-editor-media-flow__url-input"
							onKeyDown={ ( event ) => {
								if (
									! [ TAB, ESCAPE ].includes( event.keyCode )
								) {
									event.stopPropagation();
								}
							} }
							onKeyPress={ ( event ) => {
								if (
									! [ TAB, ESCAPE ].includes( event.keyCode )
								) {
									event.stopPropagation();
								}
							} }
						>
							<span className="block-editor-media-replace-flow__image-url-label">
								{ __( 'Current media URL:' ) }
							</span>
							<LinkControl
								value={ { url: mediaURLValue } }
								settings={ [] }
								showSuggestions={ false }
								onChange={ ( { url } ) => {
									setMediaURLValue( url );
									selectURL( url );
									editMediaButtonRef.current.focus();
								} }
							/>
						</form>
					) }
				</>
			) }
		/>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => {
		const { createNotice, removeNotice } = dispatch( noticesStore );
		return {
			createNotice,
			removeNotice,
		};
	} ),
	withFilters( 'editor.MediaReplaceFlow' ),
] )( MediaReplaceFlow );
