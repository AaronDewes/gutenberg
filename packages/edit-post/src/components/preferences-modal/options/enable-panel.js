/**
 * WordPress dependencies
 */
import { compose, ifCondition } from '@aarondewes/wp-compose';
import { withSelect, withDispatch } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import BaseOption from './base';
import { store as editPostStore } from '../../../store';

export default compose(
	withSelect( ( select, { panelName } ) => {
		const { isEditorPanelEnabled, isEditorPanelRemoved } = select(
			editPostStore
		);
		return {
			isRemoved: isEditorPanelRemoved( panelName ),
			isChecked: isEditorPanelEnabled( panelName ),
		};
	} ),
	ifCondition( ( { isRemoved } ) => ! isRemoved ),
	withDispatch( ( dispatch, { panelName } ) => ( {
		onChange: () =>
			dispatch( editPostStore ).toggleEditorPanelEnabled( panelName ),
	} ) )
)( BaseOption );
