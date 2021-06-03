/**
 * WordPress dependencies
 */
import { useDispatch } from '@aarondewes/wp-data';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';
import { ToolbarButton } from '@aarondewes/wp-components';
import { createBlock, rawHandler } from '@aarondewes/wp-blocks';
import { __ } from '@aarondewes/wp-i18n';

export default function ConvertToBlocksButton( { clientId, rawInstance } ) {
	const { replaceBlocks } = useDispatch( blockEditorStore );

	return (
		<ToolbarButton
			onClick={ () => {
				if ( rawInstance.title ) {
					replaceBlocks( clientId, [
						createBlock( 'core/heading', {
							content: rawInstance.title,
						} ),
						...rawHandler( { HTML: rawInstance.text } ),
					] );
				} else {
					replaceBlocks(
						clientId,
						rawHandler( { HTML: rawInstance.text } )
					);
				}
			} }
		>
			{ __( 'Convert to blocks' ) }
		</ToolbarButton>
	);
}
