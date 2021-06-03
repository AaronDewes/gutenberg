/**
 * WordPress dependencies
 */

import { BlockControls } from '@aarondewes/wp-block-editor';
import { createHigherOrderComponent } from '@aarondewes/wp-compose';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { addFilter } from '@aarondewes/wp-hooks';
import { getWidgetIdFromBlock, MoveToWidgetArea } from '@aarondewes/wp-widgets';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../store';

const withMoveToWidgetAreaToolbarItem = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const widgetId = getWidgetIdFromBlock( props );
		const blockName = props.name;
		const {
			widgetAreas,
			currentWidgetAreaId,
			canInsertBlockInWidgetArea,
		} = useSelect(
			( select ) => {
				// Component won't display for a widget area, so don't run selectors.
				if ( blockName === 'core/widget-area' ) {
					return {};
				}

				const selectors = select( editWidgetsStore );
				return {
					widgetAreas: selectors.getWidgetAreas(),
					currentWidgetAreaId: widgetId
						? selectors.getWidgetAreaForWidgetId( widgetId )?.id
						: undefined,
					canInsertBlockInWidgetArea: selectors.canInsertBlockInWidgetArea(
						blockName
					),
				};
			},
			[ widgetId, blockName ]
		);

		const { moveBlockToWidgetArea } = useDispatch( editWidgetsStore );
		const hasMultipleWidgetAreas = widgetAreas?.length > 1;
		const isMoveToWidgetAreaVisible =
			blockName !== 'core/widget-area' &&
			hasMultipleWidgetAreas &&
			canInsertBlockInWidgetArea;

		return (
			<>
				<BlockEdit { ...props } />
				{ isMoveToWidgetAreaVisible && (
					<BlockControls>
						<MoveToWidgetArea
							widgetAreas={ widgetAreas }
							currentWidgetAreaId={ currentWidgetAreaId }
							onSelect={ ( widgetAreaId ) => {
								moveBlockToWidgetArea(
									props.clientId,
									widgetAreaId
								);
							} }
						/>
					</BlockControls>
				) }
			</>
		);
	},
	'withMoveToWidgetAreaToolbarItem'
);

addFilter(
	'editor.BlockEdit',
	'core/edit-widgets/block-edit',
	withMoveToWidgetAreaToolbarItem
);
