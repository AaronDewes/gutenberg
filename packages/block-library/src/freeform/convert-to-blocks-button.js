/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { ToolbarButton } from '@aarondewes/wp-components';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { rawHandler, serialize } from '@aarondewes/wp-blocks';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';

const ConvertToBlocksButton = ( { clientId } ) => {
	const { replaceBlocks } = useDispatch( blockEditorStore );
	const block = useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlock( clientId );
		},
		[ clientId ]
	);

	return (
		<ToolbarButton
			onClick={ () =>
				replaceBlocks(
					block.clientId,
					rawHandler( { HTML: serialize( block ) } )
				)
			}
		>
			{ __( 'Convert to blocks' ) }
		</ToolbarButton>
	);
};

export default ConvertToBlocksButton;
