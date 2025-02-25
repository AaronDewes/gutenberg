/**
 * WordPress dependencies
 */
import { useShortcut } from '@aarondewes/wp-keyboard-shortcuts';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { parse } from '@aarondewes/wp-blocks';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function SaveShortcut( { resetBlocksOnSave } ) {
	const { resetEditorBlocks, savePost } = useDispatch( editorStore );
	const { isEditedPostDirty, getPostEdits } = useSelect( ( select ) => {
		const {
			isEditedPostDirty: _isEditedPostDirty,
			getPostEdits: _getPostEdits,
		} = select( editorStore );

		return {
			isEditedPostDirty: _isEditedPostDirty,
			getPostEdits: _getPostEdits,
		};
	}, [] );

	useShortcut(
		'core/editor/save',
		( event ) => {
			event.preventDefault();

			// TODO: This should be handled in the `savePost` effect in
			// considering `isSaveable`. See note on `isEditedPostSaveable`
			// selector about dirtiness and meta-boxes.
			//
			// See: `isEditedPostSaveable`
			if ( ! isEditedPostDirty() ) {
				return;
			}

			// The text editor requires that editor blocks are updated for a
			// save to work correctly. Usually this happens when the textarea
			// for the code editors blurs, but the shortcut can be used without
			// blurring the textarea.
			if ( resetBlocksOnSave ) {
				const postEdits = getPostEdits();
				if (
					postEdits.content &&
					typeof postEdits.content === 'string'
				) {
					const blocks = parse( postEdits.content );
					resetEditorBlocks( blocks );
				}
			}

			savePost();
		},
		{ bindGlobal: true }
	);

	return null;
}

export default SaveShortcut;
