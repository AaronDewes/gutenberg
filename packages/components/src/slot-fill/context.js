/**
 * WordPress dependencies
 */
import { createContext } from '@aarondewes/wp-element';

export const SlotFillContext = createContext( {
	registerSlot: () => {},
	unregisterSlot: () => {},
	registerFill: () => {},
	unregisterFill: () => {},
	getSlot: () => {},
	getFills: () => {},
	subscribe: () => {},
} );

export default SlotFillContext;
