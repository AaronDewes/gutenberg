/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

export const CardContext = createContext( {} );
export const useCardContext = () => useContext( CardContext );
