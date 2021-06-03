/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

export const FlexContext = createContext< {
	flexItemDisplay: 'block' | undefined;
} >( {
	flexItemDisplay: undefined,
} );

export const useFlexContext = () => useContext( FlexContext );
