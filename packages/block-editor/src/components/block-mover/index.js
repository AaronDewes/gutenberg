/**
 * External dependencies
 */
import { first, last, castArray } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */

import { dragHandle } from '@aarondewes/wp-icons';
import { ToolbarGroup, ToolbarItem, Button } from '@aarondewes/wp-components';
import { getBlockType } from '@aarondewes/wp-blocks';
import { useState } from '@aarondewes/wp-element';
import { withSelect } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import BlockDraggable from '../block-draggable';
import { BlockMoverUpButton, BlockMoverDownButton } from './button';
import { store as blockEditorStore } from '../../store';

function BlockMover( {
	isFirst,
	isLast,
	clientIds,
	isLocked,
	isHidden,
	rootClientId,
	orientation,
	hideDragHandle,
} ) {
	const [ isFocused, setIsFocused ] = useState( false );

	const onFocus = () => setIsFocused( true );
	const onBlur = () => setIsFocused( false );

	if ( isLocked || ( isFirst && isLast && ! rootClientId ) ) {
		return null;
	}

	const dragHandleLabel = __( 'Drag' );

	// We emulate a disabled state because forcefully applying the `disabled`
	// attribute on the buttons while it has focus causes the screen to change
	// to an unfocused state (body as active element) without firing blur on,
	// the rendering parent, leaving it unable to react to focus out.
	return (
		<div
			className={ classnames( 'block-editor-block-mover', {
				'is-visible': isFocused || ! isHidden,
				'is-horizontal': orientation === 'horizontal',
			} ) }
		>
			{ ! hideDragHandle && (
				<BlockDraggable
					clientIds={ clientIds }
					cloneClassname="block-editor-block-mover__drag-clone"
				>
					{ ( draggableProps ) => (
						<Button
							icon={ dragHandle }
							className="block-editor-block-mover__drag-handle"
							aria-hidden="true"
							label={ dragHandleLabel }
							// Should not be able to tab to drag handle as this
							// button can only be used with a pointer device.
							tabIndex="-1"
							{ ...draggableProps }
						/>
					) }
				</BlockDraggable>
			) }
			<ToolbarGroup className="block-editor-block-mover__move-button-container">
				<ToolbarItem onFocus={ onFocus } onBlur={ onBlur }>
					{ ( itemProps ) => (
						<BlockMoverUpButton
							clientIds={ clientIds }
							{ ...itemProps }
						/>
					) }
				</ToolbarItem>
				<ToolbarItem onFocus={ onFocus } onBlur={ onBlur }>
					{ ( itemProps ) => (
						<BlockMoverDownButton
							clientIds={ clientIds }
							{ ...itemProps }
						/>
					) }
				</ToolbarItem>
			</ToolbarGroup>
		</div>
	);
}

export default withSelect( ( select, { clientIds } ) => {
	const {
		getBlock,
		getBlockIndex,
		getBlockListSettings,
		getTemplateLock,
		getBlockOrder,
		getBlockRootClientId,
	} = select( blockEditorStore );
	const normalizedClientIds = castArray( clientIds );
	const firstClientId = first( normalizedClientIds );
	const block = getBlock( firstClientId );
	const rootClientId = getBlockRootClientId( first( normalizedClientIds ) );
	const firstIndex = getBlockIndex( firstClientId, rootClientId );
	const lastIndex = getBlockIndex(
		last( normalizedClientIds ),
		rootClientId
	);
	const blockOrder = getBlockOrder( rootClientId );
	const isFirst = firstIndex === 0;
	const isLast = lastIndex === blockOrder.length - 1;

	return {
		blockType: block ? getBlockType( block.name ) : null,
		isLocked: getTemplateLock( rootClientId ) === 'all',
		rootClientId,
		firstIndex,
		isFirst,
		isLast,
		orientation: getBlockListSettings( rootClientId )?.orientation,
	};
} )( BlockMover );
