/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@aarondewes/wp-data';
import { Component } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { withInstanceId, compose } from '@aarondewes/wp-compose';
import { safeDecodeURIComponent } from '@aarondewes/wp-url';

/**
 * Internal dependencies
 */
import PostSlugCheck from './check';
import { cleanForSlug } from '../../utils/url';
import { store as editorStore } from '../../store';

export class PostSlug extends Component {
	constructor( { postSlug, postTitle, postID } ) {
		super( ...arguments );

		this.state = {
			editedSlug:
				safeDecodeURIComponent( postSlug ) ||
				cleanForSlug( postTitle ) ||
				postID,
		};

		this.setSlug = this.setSlug.bind( this );
	}

	setSlug( event ) {
		const { postSlug, onUpdateSlug } = this.props;
		const { value } = event.target;

		const editedSlug = cleanForSlug( value );

		if ( editedSlug === postSlug ) {
			return;
		}

		onUpdateSlug( editedSlug );
	}

	render() {
		const { instanceId } = this.props;
		const { editedSlug } = this.state;

		const inputId = 'editor-post-slug-' + instanceId;

		return (
			<PostSlugCheck>
				<label htmlFor={ inputId }>{ __( 'Slug' ) }</label>
				<input
					type="text"
					id={ inputId }
					value={ editedSlug }
					onChange={ ( event ) =>
						this.setState( { editedSlug: event.target.value } )
					}
					onBlur={ this.setSlug }
					className="editor-post-slug__input"
				/>
			</PostSlugCheck>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getCurrentPost, getEditedPostAttribute } = select(
			editorStore
		);

		const { id } = getCurrentPost();
		return {
			postSlug: getEditedPostAttribute( 'slug' ),
			postTitle: getEditedPostAttribute( 'title' ),
			postID: id,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( editorStore );
		return {
			onUpdateSlug( slug ) {
				editPost( { slug } );
			},
		};
	} ),
	withInstanceId,
] )( PostSlug );
