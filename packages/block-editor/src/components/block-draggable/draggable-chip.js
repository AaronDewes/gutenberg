/**
 * WordPress dependencies
 */
import { _n, sprintf } from '@aarondewes/wp-i18n';
import { Flex, FlexItem } from '@aarondewes/wp-components';
import { dragHandle } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';

export default function BlockDraggableChip( { count, icon } ) {
	return (
		<div className="block-editor-block-draggable-chip-wrapper">
			<div className="block-editor-block-draggable-chip">
				<Flex
					justify="center"
					className="block-editor-block-draggable-chip__content"
				>
					<FlexItem>
						{ icon ? (
							<BlockIcon icon={ icon } />
						) : (
							sprintf(
								/* translators: %d: Number of blocks. */
								_n( '%d block', '%d blocks', count ),
								count
							)
						) }
					</FlexItem>
					<FlexItem>
						<BlockIcon icon={ dragHandle } />
					</FlexItem>
				</Flex>
			</div>
		</div>
	);
}
