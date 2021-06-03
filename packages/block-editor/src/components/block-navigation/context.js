/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

export const BlockNavigationContext = createContext( {
	__experimentalFeatures: false,
	__experimentalPersistentListViewFeatures: false,
} );

export const useBlockNavigationContext = () =>
	useContext( BlockNavigationContext );
