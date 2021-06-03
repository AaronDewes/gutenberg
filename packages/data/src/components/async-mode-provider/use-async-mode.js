/**
 * WordPress dependencies
 */
import { useContext } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import { Context } from './context';

export default function useAsyncMode() {
	return useContext( Context );
}
