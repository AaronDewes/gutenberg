/**
 * WordPress dependencies
 */
import { sprintf, _n } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { withSelect } from '@aarondewes/wp-data';
import { backup } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import PostLastRevisionCheck from './check';
import { getWPAdminURL } from '../../utils/url';
import { store as editorStore } from '../../store';

function LastRevision( { lastRevisionId, revisionsCount } ) {
	return (
		<PostLastRevisionCheck>
			<Button
				href={ getWPAdminURL( 'revision.php', {
					revision: lastRevisionId,
					gutenberg: true,
				} ) }
				className="editor-post-last-revision__title"
				icon={ backup }
			>
				{ sprintf(
					/* translators: %d: number of revisions */
					_n( '%d Revision', '%d Revisions', revisionsCount ),
					revisionsCount
				) }
			</Button>
		</PostLastRevisionCheck>
	);
}

export default withSelect( ( select ) => {
	const {
		getCurrentPostLastRevisionId,
		getCurrentPostRevisionsCount,
	} = select( editorStore );
	return {
		lastRevisionId: getCurrentPostLastRevisionId(),
		revisionsCount: getCurrentPostRevisionsCount(),
	};
} )( LastRevision );
