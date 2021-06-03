/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { decodeEntities } from '@aarondewes/wp-html-entities';
import { SelectControl } from '@aarondewes/wp-components';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostAuthorSelect() {
	const { editPost } = useDispatch( editorStore );
	const { postAuthor, authors } = useSelect( ( select ) => {
		const authorsFromAPI = select( coreStore ).getAuthors();
		return {
			postAuthor: select( editorStore ).getEditedPostAttribute(
				'author'
			),
			authors: authorsFromAPI.map( ( author ) => ( {
				label: decodeEntities( author.name ),
				value: author.id,
			} ) ),
		};
	}, [] );

	const setAuthorId = ( value ) => {
		const author = Number( value );
		editPost( { author } );
	};

	return (
		<SelectControl
			className="post-author-selector"
			label={ __( 'Author' ) }
			options={ authors }
			onChange={ setAuthorId }
			value={ postAuthor }
		/>
	);
}

export default PostAuthorSelect;
