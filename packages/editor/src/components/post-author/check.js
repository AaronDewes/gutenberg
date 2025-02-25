/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { withInstanceId, compose } from '@aarondewes/wp-compose';
import { withSelect } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';
import { store as editorStore } from '../../store';

export function PostAuthorCheck( {
	hasAssignAuthorAction,
	authors,
	children,
} ) {
	if ( ! hasAssignAuthorAction || ! authors || 1 >= authors.length ) {
		return null;
	}

	return (
		<PostTypeSupportCheck supportKeys="author">
			{ children }
		</PostTypeSupportCheck>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const post = select( editorStore ).getCurrentPost();
		return {
			hasAssignAuthorAction: get(
				post,
				[ '_links', 'wp:action-assign-author' ],
				false
			),
			postType: select( editorStore ).getCurrentPostType(),
			authors: select( coreStore ).getAuthors(),
		};
	} ),
	withInstanceId,
] )( PostAuthorCheck );
