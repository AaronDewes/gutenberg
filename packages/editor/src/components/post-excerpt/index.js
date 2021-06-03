/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { ExternalLink, TextareaControl } from '@aarondewes/wp-components';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostExcerpt( { excerpt, onUpdateExcerpt } ) {
	return (
		<div className="editor-post-excerpt">
			<TextareaControl
				label={ __( 'Write an excerpt (optional)' ) }
				className="editor-post-excerpt__textarea"
				onChange={ ( value ) => onUpdateExcerpt( value ) }
				value={ excerpt }
			/>
			<ExternalLink
				href={ __( 'https://wordpress.org/support/article/excerpt/' ) }
			>
				{ __( 'Learn more about manual excerpts' ) }
			</ExternalLink>
		</div>
	);
}

export default compose( [
	withSelect( ( select ) => {
		return {
			excerpt: select( editorStore ).getEditedPostAttribute( 'excerpt' ),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onUpdateExcerpt( excerpt ) {
			dispatch( editorStore ).editPost( { excerpt } );
		},
	} ) ),
] )( PostExcerpt );
