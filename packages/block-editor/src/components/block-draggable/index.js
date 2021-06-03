/**
 * WordPress dependencies
 */
import { getBlockType } from '@aarondewes/wp-blocks';
import { Draggable } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { useEffect, useRef } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import BlockDraggableChip from './draggable-chip';
import useScrollWhenDragging from './use-scroll-when-dragging';
import { store as blockEditorStore } from '../../store';

const BlockDraggable = ( {
	children,
	clientIds,
	cloneClassname,
	onDragStart,
	onDragEnd,
	elementId,
} ) => {
	const { srcRootClientId, isDraggable, icon } = useSelect(
		( select ) => {
			const {
				getBlockRootClientId,
				getTemplateLock,
				getBlockName,
			} = select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientIds[ 0 ] );
			const templateLock = rootClientId
				? getTemplateLock( rootClientId )
				: null;
			const blockName = getBlockName( clientIds[ 0 ] );

			return {
				srcRootClientId: rootClientId,
				isDraggable: 'all' !== templateLock,
				icon: getBlockType( blockName )?.icon,
			};
		},
		[ clientIds ]
	);
	const isDragging = useRef( false );
	const [
		startScrolling,
		scrollOnDragOver,
		stopScrolling,
	] = useScrollWhenDragging();

	const { startDraggingBlocks, stopDraggingBlocks } = useDispatch(
		blockEditorStore
	);

	// Stop dragging blocks if the block draggable is unmounted
	useEffect( () => {
		return () => {
			if ( isDragging.current ) {
				stopDraggingBlocks();
			}
		};
	}, [] );

	if ( ! isDraggable ) {
		return children( { isDraggable: false } );
	}

	const transferData = {
		type: 'block',
		srcClientIds: clientIds,
		srcRootClientId,
	};

	return (
		<Draggable
			cloneClassname={ cloneClassname }
			elementId={ elementId }
			__experimentalTransferDataType="wp-blocks"
			transferData={ transferData }
			onDragStart={ ( event ) => {
				startDraggingBlocks( clientIds );
				isDragging.current = true;

				startScrolling( event );

				if ( onDragStart ) {
					onDragStart();
				}
			} }
			onDragOver={ scrollOnDragOver }
			onDragEnd={ () => {
				stopDraggingBlocks();
				isDragging.current = false;

				stopScrolling();

				if ( onDragEnd ) {
					onDragEnd();
				}
			} }
			__experimentalDragComponent={
				<BlockDraggableChip count={ clientIds.length } icon={ icon } />
			}
		>
			{ ( { onDraggableStart, onDraggableEnd } ) => {
				return children( {
					draggable: true,
					onDragStart: onDraggableStart,
					onDragEnd: onDraggableEnd,
				} );
			} }
		</Draggable>
	);
};

export default BlockDraggable;
