/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { count as characterCount } from '@aarondewes/wp-wordcount';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export default function CharacterCount() {
	const content = useSelect( ( select ) =>
		select( editorStore ).getEditedPostAttribute( 'content' )
	);

	return characterCount( content, 'characters_including_spaces' );
}
