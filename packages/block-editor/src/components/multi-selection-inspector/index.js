/**
 * WordPress dependencies
 */
import { sprintf, _n } from '@aarondewes/wp-i18n';
import { withSelect } from '@aarondewes/wp-data';
import { serialize } from '@aarondewes/wp-blocks';
import { count as wordCount } from '@aarondewes/wp-wordcount';
import { stack } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import { store as blockEditorStore } from '../../store';

function MultiSelectionInspector( { blocks } ) {
	const words = wordCount( serialize( blocks ), 'words' );

	return (
		<div className="block-editor-multi-selection-inspector__card">
			<BlockIcon icon={ stack } showColors />
			<div className="block-editor-multi-selection-inspector__card-content">
				<div className="block-editor-multi-selection-inspector__card-title">
					{ sprintf(
						/* translators: %d: number of blocks */
						_n( '%d block', '%d blocks', blocks.length ),
						blocks.length
					) }
				</div>
				<div className="block-editor-multi-selection-inspector__card-description">
					{ sprintf(
						/* translators: %d: number of words */
						_n( '%d word', '%d words', words ),
						words
					) }
				</div>
			</div>
		</div>
	);
}

export default withSelect( ( select ) => {
	const { getMultiSelectedBlocks } = select( blockEditorStore );
	return {
		blocks: getMultiSelectedBlocks(),
	};
} )( MultiSelectionInspector );
