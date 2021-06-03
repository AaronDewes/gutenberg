/**
 * WordPress dependencies
 */
import { createContext } from '@aarondewes/wp-element';

const RadioContext = createContext( {
	state: null,
	setState: () => {},
} );

export default RadioContext;
