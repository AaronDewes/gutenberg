/**
 * WordPress dependencies
 */
import triggerFetch from '@aarondewes/wp-api-fetch';
import { controls as dataControls } from '@aarondewes/wp-data';
import deprecated from '@aarondewes/wp-deprecated';

/**
 * Dispatches a control action for triggering an api fetch call.
 *
 * @param {Object} request Arguments for the fetch request.
 *
 * @example
 * ```js
 * import { apiFetch } from '@aarondewes/wp-data-controls';
 *
 * // Action generator using apiFetch
 * export function* myAction() {
 * 	const path = '/v2/my-api/items';
 * 	const items = yield apiFetch( { path } );
 * 	// do something with the items.
 * }
 * ```
 *
 * @return {Object} The control descriptor.
 */
export function apiFetch( request ) {
	return {
		type: 'API_FETCH',
		request,
	};
}

/**
 * Control for resolving a selector in a registered data store.
 * Alias for the `resolveSelect` built-in control in the `@aarondewes/wp-data` package.
 *
 * @param {Array} args Arguments passed without change to the `@aarondewes/wp-data` control.
 */
export function select( ...args ) {
	deprecated( '`select` control in `@aarondewes/wp-data-controls`', {
		since: '5.7',
		alternative: 'built-in `resolveSelect` control in `@aarondewes/wp-data`',
	} );

	return dataControls.resolveSelect( ...args );
}

/**
 * Control for calling a selector in a registered data store.
 * Alias for the `select` built-in control in the `@aarondewes/wp-data` package.
 *
 * @param {Array} args Arguments passed without change to the `@aarondewes/wp-data` control.
 */
export function syncSelect( ...args ) {
	deprecated( '`syncSelect` control in `@aarondewes/wp-data-controls`', {
		since: '5.7',
		alternative: 'built-in `select` control in `@aarondewes/wp-data`',
	} );

	return dataControls.select( ...args );
}

/**
 * Control for dispatching an action in a registered data store.
 * Alias for the `dispatch` control in the `@aarondewes/wp-data` package.
 *
 * @param {Array} args Arguments passed without change to the `@aarondewes/wp-data` control.
 */
export function dispatch( ...args ) {
	deprecated( '`dispatch` control in `@aarondewes/wp-data-controls`', {
		since: '5.7',
		alternative: 'built-in `dispatch` control in `@aarondewes/wp-data`',
	} );

	return dataControls.dispatch( ...args );
}

/**
 * Dispatches a control action for awaiting on a promise to be resolved.
 *
 * @param {Object} promise Promise to wait for.
 *
 * @example
 * ```js
 * import { __unstableAwaitPromise } from '@aarondewes/wp-data-controls';
 *
 * // Action generator using apiFetch
 * export function* myAction() {
 * 	const promise = getItemsAsync();
 * 	const items = yield __unstableAwaitPromise( promise );
 * 	// do something with the items.
 * }
 * ```
 *
 * @return {Object} The control descriptor.
 */
export const __unstableAwaitPromise = function ( promise ) {
	return {
		type: 'AWAIT_PROMISE',
		promise,
	};
};

/**
 * The default export is what you use to register the controls with your custom
 * store.
 *
 * @example
 * ```js
 * // WordPress dependencies
 * import { controls } from '@aarondewes/wp-data-controls';
 * import { registerStore } from '@aarondewes/wp-data';
 *
 * // Internal dependencies
 * import reducer from './reducer';
 * import * as selectors from './selectors';
 * import * as actions from './actions';
 * import * as resolvers from './resolvers';
 *
 * registerStore( 'my-custom-store', {
 * reducer,
 * controls,
 * actions,
 * selectors,
 * resolvers,
 * } );
 * ```
 * @return {Object} An object for registering the default controls with the
 * store.
 */
export const controls = {
	AWAIT_PROMISE: ( { promise } ) => promise,
	API_FETCH( { request } ) {
		return triggerFetch( request );
	},
};
