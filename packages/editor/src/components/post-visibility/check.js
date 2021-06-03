/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@aarondewes/wp-compose';
import { withSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export function PostVisibilityCheck( { hasPublishAction, render } ) {
	const canEdit = hasPublishAction;
	return render( { canEdit } );
}

export default compose( [
	withSelect( ( select ) => {
		const { getCurrentPost, getCurrentPostType } = select( editorStore );
		return {
			hasPublishAction: get(
				getCurrentPost(),
				[ '_links', 'wp:action-publish' ],
				false
			),
			postType: getCurrentPostType(),
		};
	} ),
] )( PostVisibilityCheck );
