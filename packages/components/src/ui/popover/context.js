/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@aarondewes/wp-element';

/**
 * @type {import('react').Context<import('./types').PopoverContext>}
 */
export const PopoverContext = createContext( {} );
export const usePopoverContext = () => useContext( PopoverContext );
