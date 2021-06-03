/**
 * WordPress dependencies
 */
import {
	__experimentalBlockNavigationTree,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { useSelect } from '@aarondewes/wp-data';

export default function BlockNavigationList( {
	clientId,
	__experimentalFeatures,
} ) {
	const blocks = useSelect(
		( select ) =>
			select( blockEditorStore ).__unstableGetClientIdsTree( clientId ),
		[ clientId ]
	);

	return (
		<__experimentalBlockNavigationTree
			blocks={ blocks }
			showAppender
			showBlockMovers
			showNestedBlocks
			__experimentalFeatures={ __experimentalFeatures }
		/>
	);
}
