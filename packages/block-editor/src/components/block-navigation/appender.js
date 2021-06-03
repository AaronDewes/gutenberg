/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __experimentalTreeGridCell as TreeGridCell } from '@aarondewes/wp-components';
import { useInstanceId } from '@aarondewes/wp-compose';
import { __, sprintf } from '@aarondewes/wp-i18n';
import { useSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import BlockNavigationLeaf from './leaf';
import Inserter from '../inserter';
import { store as blockEditorStore } from '../../store';

export default function BlockNavigationAppender( {
	parentBlockClientId,
	position,
	level,
	rowCount,
	path,
} ) {
	const isDragging = useSelect(
		( select ) => {
			const { isBlockBeingDragged, isAncestorBeingDragged } = select(
				blockEditorStore
			);

			return (
				isBlockBeingDragged( parentBlockClientId ) ||
				isAncestorBeingDragged( parentBlockClientId )
			);
		},
		[ parentBlockClientId ]
	);
	const instanceId = useInstanceId( BlockNavigationAppender );
	const descriptionId = `block-navigation-appender-row__description_${ instanceId }`;

	const appenderPositionDescription = sprintf(
		/* translators: 1: The numerical position of the block that will be inserted. 2: The level of nesting for the block that will be inserted. */
		__( 'Add block at position %1$d, Level %2$d' ),
		position,
		level
	);

	return (
		<BlockNavigationLeaf
			className={ classnames( { 'is-dragging': isDragging } ) }
			level={ level }
			position={ position }
			rowCount={ rowCount }
			path={ path }
		>
			<TreeGridCell
				className="block-editor-block-navigation-appender__cell"
				colSpan="3"
			>
				{ ( { ref, tabIndex, onFocus } ) => (
					<div className="block-editor-block-navigation-appender__container">
						<Inserter
							rootClientId={ parentBlockClientId }
							__experimentalIsQuick
							aria-describedby={ descriptionId }
							toggleProps={ { ref, tabIndex, onFocus } }
						/>
						<div
							className="block-editor-block-navigation-appender__description"
							id={ descriptionId }
						>
							{ appenderPositionDescription }
						</div>
					</div>
				) }
			</TreeGridCell>
		</BlockNavigationLeaf>
	);
}
