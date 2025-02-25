/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@aarondewes/wp-blocks';
import { Toolbar, ToolbarButton } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import UngroupIcon from './icon';
import { store as blockEditorStore } from '../../store';

export function UngroupButton( { onConvertFromGroup, isUngroupable = false } ) {
	if ( ! isUngroupable ) {
		return null;
	}
	return (
		<Toolbar>
			<ToolbarButton
				title={ __( 'Ungroup' ) }
				icon={ UngroupIcon }
				onClick={ onConvertFromGroup }
			/>
		</Toolbar>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const { getSelectedBlockClientId, getBlock } = select(
			blockEditorStore
		);

		const { getGroupingBlockName } = select( blocksStore );

		const selectedId = getSelectedBlockClientId();
		const selectedBlock = getBlock( selectedId );

		const groupingBlockName = getGroupingBlockName();

		const isUngroupable =
			selectedBlock &&
			selectedBlock.innerBlocks &&
			!! selectedBlock.innerBlocks.length &&
			selectedBlock.name === groupingBlockName;
		const innerBlocks = isUngroupable ? selectedBlock.innerBlocks : [];

		return {
			isUngroupable,
			clientId: selectedId,
			innerBlocks,
		};
	} ),
	withDispatch( ( dispatch, { clientId, innerBlocks, onToggle = noop } ) => {
		const { replaceBlocks } = dispatch( blockEditorStore );

		return {
			onConvertFromGroup() {
				if ( ! innerBlocks.length ) {
					return;
				}

				replaceBlocks( clientId, innerBlocks );

				onToggle();
			},
		};
	} ),
] )( UngroupButton );
