/**
 * WordPress dependencies
 */
import { createSlotFill } from '@aarondewes/wp-components';

const { Fill: __unstableBlockSettingsMenuFirstItem, Slot } = createSlotFill(
	'__unstableBlockSettingsMenuFirstItem'
);

__unstableBlockSettingsMenuFirstItem.Slot = Slot;

export default __unstableBlockSettingsMenuFirstItem;
