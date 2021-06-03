/**
 * External dependencies
 */
import classnames from 'classnames';
import { get, omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@aarondewes/wp-element';
import { Button, Spinner, ButtonGroup } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { BACKSPACE, DELETE } from '@aarondewes/wp-keycodes';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import {
	RichText,
	MediaPlaceholder,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { isBlobURL } from '@aarondewes/wp-blob';
import { compose } from '@aarondewes/wp-compose';
import {
	closeSmall,
	chevronLeft,
	chevronRight,
	edit,
	image as imageIcon,
} from '@aarondewes/wp-icons';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { pickRelevantMediaFiles } from './shared';
import {
	LINK_DESTINATION_ATTACHMENT,
	LINK_DESTINATION_MEDIA,
} from './constants';

const isTemporaryImage = ( id, url ) => ! id && isBlobURL( url );

class GalleryImage extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.bindContainer = this.bindContainer.bind( this );
		this.onEdit = this.onEdit.bind( this );
		this.onSelectImageFromLibrary = this.onSelectImageFromLibrary.bind(
			this
		);
		this.onSelectCustomURL = this.onSelectCustomURL.bind( this );
		this.state = {
			isEditing: false,
		};
	}

	bindContainer( ref ) {
		this.container = ref;
	}

	onSelectImage() {
		if ( ! this.props.isSelected ) {
			this.props.onSelect();
		}
	}

	onRemoveImage( event ) {
		if (
			this.container === this.container.ownerDocument.activeElement &&
			this.props.isSelected &&
			[ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
		) {
			event.stopPropagation();
			event.preventDefault();
			this.props.onRemove();
		}
	}

	onEdit() {
		this.setState( {
			isEditing: true,
		} );
	}

	componentDidUpdate() {
		const {
			image,
			url,
			__unstableMarkNextChangeAsNotPersistent,
		} = this.props;
		if ( image && ! url ) {
			__unstableMarkNextChangeAsNotPersistent();
			this.props.setAttributes( {
				url: image.source_url,
				alt: image.alt_text,
			} );
		}
	}

	deselectOnBlur() {
		this.props.onDeselect();
	}

	onSelectImageFromLibrary( media ) {
		const { setAttributes, id, url, alt, caption, sizeSlug } = this.props;
		if ( ! media || ! media.url ) {
			return;
		}

		let mediaAttributes = pickRelevantMediaFiles( media, sizeSlug );

		// If the current image is temporary but an alt text was meanwhile
		// written by the user, make sure the text is not overwritten.
		if ( isTemporaryImage( id, url ) ) {
			if ( alt ) {
				mediaAttributes = omit( mediaAttributes, [ 'alt' ] );
			}
		}

		// If a caption text was meanwhile written by the user,
		// make sure the text is not overwritten by empty captions.
		if ( caption && ! get( mediaAttributes, [ 'caption' ] ) ) {
			mediaAttributes = omit( mediaAttributes, [ 'caption' ] );
		}

		setAttributes( mediaAttributes );
		this.setState( {
			isEditing: false,
		} );
	}

	onSelectCustomURL( newURL ) {
		const { setAttributes, url } = this.props;
		if ( newURL !== url ) {
			setAttributes( {
				url: newURL,
				id: undefined,
			} );
			this.setState( {
				isEditing: false,
			} );
		}
	}

	render() {
		const {
			url,
			alt,
			id,
			linkTo,
			link,
			isFirstItem,
			isLastItem,
			isSelected,
			caption,
			onRemove,
			onMoveForward,
			onMoveBackward,
			setAttributes,
			'aria-label': ariaLabel,
		} = this.props;
		const { isEditing } = this.state;

		let href;

		switch ( linkTo ) {
			case LINK_DESTINATION_MEDIA:
				href = url;
				break;
			case LINK_DESTINATION_ATTACHMENT:
				href = link;
				break;
		}

		const img = (
			// Disable reason: Image itself is not meant to be interactive, but should
			// direct image selection and unfocus caption fields.
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
			<>
				<img
					src={ url }
					alt={ alt }
					data-id={ id }
					onKeyDown={ this.onRemoveImage }
					tabIndex="0"
					aria-label={ ariaLabel }
					ref={ this.bindContainer }
				/>
				{ isBlobURL( url ) && <Spinner /> }
			</>
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
		);

		const className = classnames( {
			'is-selected': isSelected,
			'is-transient': isBlobURL( url ),
		} );

		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
			<figure
				className={ className }
				onClick={ this.onSelectImage }
				onFocus={ this.onSelectImage }
			>
				{ ! isEditing && ( href ? <a href={ href }>{ img }</a> : img ) }
				{ isEditing && (
					<MediaPlaceholder
						labels={ { title: __( 'Edit gallery image' ) } }
						icon={ imageIcon }
						onSelect={ this.onSelectImageFromLibrary }
						onSelectURL={ this.onSelectCustomURL }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						value={ { id, src: url } }
					/>
				) }
				<ButtonGroup className="block-library-gallery-item__inline-menu is-left">
					<Button
						icon={ chevronLeft }
						onClick={ isFirstItem ? undefined : onMoveBackward }
						label={ __( 'Move image backward' ) }
						aria-disabled={ isFirstItem }
						disabled={ ! isSelected }
					/>
					<Button
						icon={ chevronRight }
						onClick={ isLastItem ? undefined : onMoveForward }
						label={ __( 'Move image forward' ) }
						aria-disabled={ isLastItem }
						disabled={ ! isSelected }
					/>
				</ButtonGroup>
				<ButtonGroup className="block-library-gallery-item__inline-menu is-right">
					<Button
						icon={ edit }
						onClick={ this.onEdit }
						label={ __( 'Replace image' ) }
						disabled={ ! isSelected }
					/>
					<Button
						icon={ closeSmall }
						onClick={ onRemove }
						label={ __( 'Remove image' ) }
						disabled={ ! isSelected }
					/>
				</ButtonGroup>
				{ ! isEditing && ( isSelected || caption ) && (
					<RichText
						tagName="figcaption"
						aria-label={ __( 'Image caption text' ) }
						placeholder={ isSelected ? __( 'Add caption' ) : null }
						value={ caption }
						onChange={ ( newCaption ) =>
							setAttributes( { caption: newCaption } )
						}
						inlineToolbar
					/>
				) }
			</figure>
		);
	}
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { getMedia } = select( coreStore );
		const { id } = ownProps;

		return {
			image: id ? getMedia( parseInt( id, 10 ) ) : null,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { __unstableMarkNextChangeAsNotPersistent } = dispatch(
			blockEditorStore
		);
		return {
			__unstableMarkNextChangeAsNotPersistent,
		};
	} ),
] )( GalleryImage );
