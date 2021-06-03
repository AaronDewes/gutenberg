/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

export const ItemGroupContext = createContext( { size: 'medium' } as {
	spacedAround: boolean;
	size: 'small' | 'medium' | 'large';
} );

export const useItemGroupContext = () => useContext( ItemGroupContext );
