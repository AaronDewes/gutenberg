/**
 * External dependencies
 */
import { useMemoOne } from 'use-memo-one';

/**
 * WordPress dependencies
 */
import { createQueue } from '@aarondewes/wp-priority-queue';
import { useRef, useCallback, useReducer, useMemo } from '@aarondewes/wp-element';
import isShallowEqual from '@aarondewes/wp-is-shallow-equal';
import { useIsomorphicLayoutEffect } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import useRegistry from '../registry-provider/use-registry';
import useAsyncMode from '../async-mode-provider/use-async-mode';

const renderQueue = createQueue();

/** @typedef {import('./types').WPDataStore} WPDataStore */

/**
 * Custom react hook for retrieving props from registered selectors.
 *
 * In general, this custom React hook follows the
 * [rules of hooks](https://reactjs.org/docs/hooks-rules.html).
 *
 * @param {Function|WPDataStore|string} _mapSelect  Function called on every state change. The
 *                                                  returned value is exposed to the component
 *                                                  implementing this hook. The function receives
 *                                                  the `registry.select` method on the first
 *                                                  argument and the `registry` on the second
 *                                                  argument.
 *                                                  When a store key is passed, all selectors for
 *                                                  the store will be returned. This is only meant
 *                                                  for usage of these selectors in event
 *                                                  callbacks, not for data needed to create the
 *                                                  element tree.
 * @param {Array}                       deps        If provided, this memoizes the mapSelect so the
 *                                                  same `mapSelect` is invoked on every state
 *                                                  change unless the dependencies change.
 *
 * @example
 * ```js
 * import { useSelect } from '@aarondewes/wp-data';
 *
 * function HammerPriceDisplay( { currency } ) {
 *   const price = useSelect( ( select ) => {
 *     return select( 'my-shop' ).getPrice( 'hammer', currency )
 *   }, [ currency ] );
 *   return new Intl.NumberFormat( 'en-US', {
 *     style: 'currency',
 *     currency,
 *   } ).format( price );
 * }
 *
 * // Rendered in the application:
 * // <HammerPriceDisplay currency="USD" />
 * ```
 *
 * In the above example, when `HammerPriceDisplay` is rendered into an
 * application, the price will be retrieved from the store state using the
 * `mapSelect` callback on `useSelect`. If the currency prop changes then
 * any price in the state for that currency is retrieved. If the currency prop
 * doesn't change and other props are passed in that do change, the price will
 * not change because the dependency is just the currency.
 *
 * When data is only used in an event callback, the data should not be retrieved
 * on render, so it may be useful to get the selectors function instead.
 *
 * **Don't use `useSelect` this way when calling the selectors in the render
 * function because your component won't re-render on a data change.**
 *
 * ```js
 * import { useSelect } from '@aarondewes/wp-data';
 *
 * function Paste( { children } ) {
 *   const { getSettings } = useSelect( 'my-shop' );
 *   function onPaste() {
 *     // Do something with the settings.
 *     const settings = getSettings();
 *   }
 *   return <div onPaste={ onPaste }>{ children }</div>;
 * }
 * ```
 *
 * @return {Function}  A custom react hook.
 */
export default function useSelect( _mapSelect, deps ) {
	const isWithoutMapping = typeof _mapSelect !== 'function';

	if ( isWithoutMapping ) {
		deps = [];
	}

	const mapSelect = useCallback( _mapSelect, deps );
	const registry = useRegistry();
	const isAsync = useAsyncMode();
	// React can sometimes clear the `useMemo` cache.
	// We use the cache-stable `useMemoOne` to avoid
	// losing queues.
	const queueContext = useMemoOne( () => ( { queue: true } ), [ registry ] );
	const [ , forceRender ] = useReducer( ( s ) => s + 1, 0 );

	const latestMapSelect = useRef();
	const latestIsAsync = useRef( isAsync );
	const latestMapOutput = useRef();
	const latestMapOutputError = useRef();
	const isMountedAndNotUnsubscribing = useRef();

	// Keep track of the stores being selected in the mapSelect function,
	// and only subscribe to those stores later.
	const listeningStores = useRef( [] );
	const trapSelect = useCallback(
		( callback ) =>
			registry.__experimentalMarkListeningStores(
				callback,
				listeningStores
			),
		[ registry ]
	);

	// Generate a "flag" for used in the effect dependency array.
	// It's different than just using `mapSelect` since deps could be undefined,
	// in that case, we would still want to memoize it.
	const depsChangedFlag = useMemo( () => ( {} ), deps || [] );

	let mapOutput;

	if ( ! isWithoutMapping ) {
		try {
			if (
				latestMapSelect.current !== mapSelect ||
				latestMapOutputError.current
			) {
				mapOutput = trapSelect( () =>
					mapSelect( registry.select, registry )
				);
			} else {
				mapOutput = latestMapOutput.current;
			}
		} catch ( error ) {
			let errorMessage = `An error occurred while running 'mapSelect': ${ error.message }`;

			if ( latestMapOutputError.current ) {
				errorMessage += `\nThe error may be correlated with this previous error:\n`;
				errorMessage += `${ latestMapOutputError.current.stack }\n\n`;
				errorMessage += 'Original stack trace:';

				throw new Error( errorMessage );
			} else {
				// eslint-disable-next-line no-console
				console.error( errorMessage );
			}
		}
	}

	useIsomorphicLayoutEffect( () => {
		if ( isWithoutMapping ) {
			return;
		}

		latestMapSelect.current = mapSelect;
		latestMapOutput.current = mapOutput;
		latestMapOutputError.current = undefined;
		isMountedAndNotUnsubscribing.current = true;

		// This has to run after the other ref updates
		// to avoid using stale values in the flushed
		// callbacks or potentially overwriting a
		// changed `latestMapOutput.current`.
		if ( latestIsAsync.current !== isAsync ) {
			latestIsAsync.current = isAsync;
			renderQueue.flush( queueContext );
		}
	} );

	useIsomorphicLayoutEffect( () => {
		if ( isWithoutMapping ) {
			return;
		}

		const onStoreChange = () => {
			if ( isMountedAndNotUnsubscribing.current ) {
				try {
					const newMapOutput = trapSelect( () =>
						latestMapSelect.current( registry.select, registry )
					);

					if (
						isShallowEqual( latestMapOutput.current, newMapOutput )
					) {
						return;
					}
					latestMapOutput.current = newMapOutput;
				} catch ( error ) {
					latestMapOutputError.current = error;
				}
				forceRender();
			}
		};

		// catch any possible state changes during mount before the subscription
		// could be set.
		if ( latestIsAsync.current ) {
			renderQueue.add( queueContext, onStoreChange );
		} else {
			onStoreChange();
		}

		const onChange = () => {
			if ( latestIsAsync.current ) {
				renderQueue.add( queueContext, onStoreChange );
			} else {
				onStoreChange();
			}
		};

		const unsubscribers = listeningStores.current.map( ( storeName ) =>
			registry.__experimentalSubscribeStore( storeName, onChange )
		);

		return () => {
			isMountedAndNotUnsubscribing.current = false;
			// The return value of the subscribe function could be undefined if the store is a custom generic store.
			unsubscribers.forEach( ( unsubscribe ) => unsubscribe?.() );
			renderQueue.flush( queueContext );
		};
	}, [ registry, trapSelect, depsChangedFlag, isWithoutMapping ] );

	return isWithoutMapping ? registry.select( _mapSelect ) : mapOutput;
}
