/**
 * WordPress dependencies
 */
import { MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { isReusableBlock } from '@aarondewes/wp-blocks';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import {
	BlockSettingsMenuControls,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { addQueryArgs } from '@aarondewes/wp-url';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as reusableBlocksStore } from '../../store';

function ReusableBlocksManageButton( { clientId } ) {
	const { isVisible } = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const { canUser } = select( coreStore );
			const reusableBlock = getBlock( clientId );

			return {
				isVisible:
					!! reusableBlock &&
					isReusableBlock( reusableBlock ) &&
					!! canUser(
						'update',
						'blocks',
						reusableBlock.attributes.ref
					),
			};
		},
		[ clientId ]
	);

	const {
		__experimentalConvertBlockToStatic: convertBlockToStatic,
	} = useDispatch( reusableBlocksStore );

	if ( ! isVisible ) {
		return null;
	}

	return (
		<BlockSettingsMenuControls>
			<MenuItem
				href={ addQueryArgs( 'edit.php', { post_type: 'wp_block' } ) }
			>
				{ __( 'Manage Reusable blocks' ) }
			</MenuItem>
			<MenuItem onClick={ () => convertBlockToStatic( clientId ) }>
				{ __( 'Convert to regular blocks' ) }
			</MenuItem>
		</BlockSettingsMenuControls>
	);
}

export default ReusableBlocksManageButton;
