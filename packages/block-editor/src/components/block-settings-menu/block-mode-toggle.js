/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { MenuItem } from '@aarondewes/wp-components';
import { getBlockType, hasBlockSupport } from '@aarondewes/wp-blocks';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

export function BlockModeToggle( {
	blockType,
	mode,
	onToggleMode,
	small = false,
	isCodeEditingEnabled = true,
} ) {
	if (
		! hasBlockSupport( blockType, 'html', true ) ||
		! isCodeEditingEnabled
	) {
		return null;
	}

	const label =
		mode === 'visual' ? __( 'Edit as HTML' ) : __( 'Edit visually' );

	return <MenuItem onClick={ onToggleMode }>{ ! small && label }</MenuItem>;
}

export default compose( [
	withSelect( ( select, { clientId } ) => {
		const { getBlock, getBlockMode, getSettings } = select(
			blockEditorStore
		);
		const block = getBlock( clientId );
		const isCodeEditingEnabled = getSettings().codeEditingEnabled;

		return {
			mode: getBlockMode( clientId ),
			blockType: block ? getBlockType( block.name ) : null,
			isCodeEditingEnabled,
		};
	} ),
	withDispatch( ( dispatch, { onToggle = noop, clientId } ) => ( {
		onToggleMode() {
			dispatch( blockEditorStore ).toggleBlockMode( clientId );
			onToggle();
		},
	} ) ),
] )( BlockModeToggle );
