/**
 * WordPress dependencies
 */
import { createSlotFill } from '@aarondewes/wp-components';

const { Slot: ViewerSlot, Fill: ViewerFill } = createSlotFill(
	'BlockEditorLinkControlViewer'
);

export { ViewerSlot, ViewerFill };
export default ViewerSlot;
