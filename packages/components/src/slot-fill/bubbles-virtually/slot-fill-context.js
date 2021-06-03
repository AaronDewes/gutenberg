/**
 * WordPress dependencies
 */
import { createContext } from '@aarondewes/wp-element';
import warning from '@aarondewes/wp-warning';

const SlotFillContext = createContext( {
	slots: {},
	fills: {},
	registerSlot: () => {
		warning(
			'Components must be wrapped within `SlotFillProvider`. ' +
				'See https://developer.wordpress.org/block-editor/components/slot-fill/'
		);
	},
	updateSlot: () => {},
	unregisterSlot: () => {},
	registerFill: () => {},
	unregisterFill: () => {},
} );

export default SlotFillContext;
