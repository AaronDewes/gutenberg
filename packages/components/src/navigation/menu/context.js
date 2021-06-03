/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

export const NavigationMenuContext = createContext( {
	menu: undefined,
	search: '',
} );
export const useNavigationMenuContext = () =>
	useContext( NavigationMenuContext );
