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

export function PostPendingStatusCheck( {
	hasPublishAction,
	isPublished,
	children,
} ) {
	if ( isPublished || ! hasPublishAction ) {
		return null;
	}

	return children;
}

export default compose(
	withSelect( ( select ) => {
		const {
			isCurrentPostPublished,
			getCurrentPostType,
			getCurrentPost,
		} = select( editorStore );
		return {
			hasPublishAction: get(
				getCurrentPost(),
				[ '_links', 'wp:action-publish' ],
				false
			),
			isPublished: isCurrentPostPublished(),
			postType: getCurrentPostType(),
		};
	} )
)( PostPendingStatusCheck );
