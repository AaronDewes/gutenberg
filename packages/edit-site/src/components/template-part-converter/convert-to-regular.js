/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import {
	BlockSettingsMenuControls,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

export default function ConvertToRegularBlocks( { clientId } ) {
	const { innerBlocks } = useSelect(
		( select ) =>
			select( blockEditorStore ).__unstableGetBlockWithBlockTree(
				clientId
			),
		[ clientId ]
	);
	const { replaceBlocks } = useDispatch( blockEditorStore );

	return (
		<BlockSettingsMenuControls>
			{ ( { onClose } ) => (
				<MenuItem
					onClick={ () => {
						replaceBlocks( clientId, innerBlocks );
						onClose();
					} }
				>
					{ __( 'Detach blocks from template part' ) }
				</MenuItem>
			) }
		</BlockSettingsMenuControls>
	);
}
