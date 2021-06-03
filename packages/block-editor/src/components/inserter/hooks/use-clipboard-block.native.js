/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { rawHandler, store as blocksStore } from '@aarondewes/wp-blocks';
import { getClipboard } from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../../store';

export default function useClipboardBlock( destinationRootClientId ) {
	const { canInsertBlockType } = useSelect( blockEditorStore );
	const { getBlockType } = useSelect( blocksStore );

	const clipboard = getClipboard();
	const clipboardBlock = rawHandler( { HTML: clipboard } )[ 0 ];

	const canAddClipboardBlock = canInsertBlockType(
		clipboardBlock?.name,
		destinationRootClientId
	);

	if ( ! canAddClipboardBlock ) {
		return undefined;
	}

	const { icon, name } = getBlockType( clipboardBlock.name );
	const { attributes: initialAttributes, innerBlocks } = clipboardBlock;

	return {
		id: 'clipboard',
		name,
		icon,
		initialAttributes,
		innerBlocks,
	};
}
