/**
 * WordPress dependencies
 */
import { unregisterBlockType } from '@aarondewes/wp-blocks';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { useEffect } from '@aarondewes/wp-element';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import { store as blockDirectoryStore } from '../../store';

export default function AutoBlockUninstaller() {
	const { uninstallBlockType } = useDispatch( blockDirectoryStore );

	const shouldRemoveBlockTypes = useSelect( ( select ) => {
		const { isAutosavingPost, isSavingPost } = select( editorStore );
		return isSavingPost() && ! isAutosavingPost();
	}, [] );

	const unusedBlockTypes = useSelect(
		( select ) => select( blockDirectoryStore ).getUnusedBlockTypes(),
		[]
	);

	useEffect( () => {
		if ( shouldRemoveBlockTypes && unusedBlockTypes.length ) {
			unusedBlockTypes.forEach( ( blockType ) => {
				uninstallBlockType( blockType );
				unregisterBlockType( blockType.name );
			} );
		}
	}, [ shouldRemoveBlockTypes ] );

	return null;
}
