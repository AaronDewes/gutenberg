/**
 * Internal dependencies
 */
import useRegistry from '../registry-provider/use-registry';

/** @typedef {import('./types').WPDataStore} WPDataStore */

/**
 * A custom react hook returning the current registry dispatch actions creators.
 *
 * Note: The component using this hook must be within the context of a
 * RegistryProvider.
 *
 * @param {string|WPDataStore} [storeNameOrDefinition] Optionally provide the name of the
 *                                                     store or its definition from which to
 *                                                     retrieve action creators. If not
 *                                                     provided, the registry.dispatch
 *                                                     function is returned instead.
 *
 * @example
 * This illustrates a pattern where you may need to retrieve dynamic data from
 * the server via the `useSelect` hook to use in combination with the dispatch
 * action.
 *
 * ```jsx
 * import { useDispatch, useSelect } from '@aarondewes/wp-data';
 * import { useCallback } from '@aarondewes/wp-element';
 *
 * function Button( { onClick, children } ) {
 *   return <button type="button" onClick={ onClick }>{ children }</button>
 * }
 *
 * const SaleButton = ( { children } ) => {
 *   const { stockNumber } = useSelect(
 *     ( select ) => select( 'my-shop' ).getStockNumber(),
 *     []
 *   );
 *   const { startSale } = useDispatch( 'my-shop' );
 *   const onClick = useCallback( () => {
 *     const discountPercent = stockNumber > 50 ? 10: 20;
 *     startSale( discountPercent );
 *   }, [ stockNumber ] );
 *   return <Button onClick={ onClick }>{ children }</Button>
 * }
 *
 * // Rendered somewhere in the application:
 * //
 * // <SaleButton>Start Sale!</SaleButton>
 * ```
 * @return {Function}  A custom react hook.
 */
const useDispatch = ( storeNameOrDefinition ) => {
	const { dispatch } = useRegistry();
	return storeNameOrDefinition === void 0
		? dispatch
		: dispatch( storeNameOrDefinition );
};

export default useDispatch;
