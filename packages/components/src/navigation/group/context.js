/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

export const NavigationGroupContext = createContext( { group: undefined } );

export const useNavigationGroupContext = () =>
	useContext( NavigationGroupContext );
