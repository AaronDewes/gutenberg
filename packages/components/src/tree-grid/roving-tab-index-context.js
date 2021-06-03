/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

const RovingTabIndexContext = createContext();
export const useRovingTabIndexContext = () =>
	useContext( RovingTabIndexContext );
export const RovingTabIndexProvider = RovingTabIndexContext.Provider;
