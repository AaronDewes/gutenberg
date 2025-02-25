/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@aarondewes/wp-element';

const breakpoints = [ '40em', '52em', '64em' ];

export const useBreakpointIndex = (
	options: { defaultIndex?: number } = {}
) => {
	const { defaultIndex = 0 } = options;

	if ( typeof defaultIndex !== 'number' ) {
		throw new TypeError(
			`Default breakpoint index should be a number. Got: ${ defaultIndex }, ${ typeof defaultIndex }`
		);
	} else if ( defaultIndex < 0 || defaultIndex > breakpoints.length - 1 ) {
		throw new RangeError(
			`Default breakpoint index out of range. Theme has ${ breakpoints.length } breakpoints, got index ${ defaultIndex }`
		);
	}

	const [ value, setValue ] = useState( defaultIndex );

	useEffect( () => {
		const getIndex = () =>
			breakpoints.filter( ( bp ) => {
				return typeof window !== 'undefined'
					? window.matchMedia( `screen and (min-width: ${ bp })` )
							.matches
					: false;
			} ).length;

		const onResize = () => {
			const newValue = getIndex();
			if ( value !== newValue ) {
				setValue( newValue );
			}
		};

		onResize();

		if ( typeof document !== 'undefined' ) {
			// Disable reason: We don't really care about what document we listen to, we just want to know that we're resizing.
			/* eslint-disable @aarondewes/wp-no-global-event-listener */
			document.addEventListener( 'resize', onResize );
		}
		return () => {
			if ( typeof document !== 'undefined' ) {
				document.removeEventListener( 'resize', onResize );
				/* eslint-enable @aarondewes/wp-no-global-event-listener */
			}
		};
	}, [ value ] );

	return value;
};

export function useResponsiveValue< T >(
	values: ( T | undefined )[],
	options: Parameters< typeof useBreakpointIndex >[ 0 ] = {}
): T | undefined {
	const index = useBreakpointIndex( options );

	// Allow calling the function with a "normal" value without having to check on the outside.
	if ( ! Array.isArray( values ) && typeof values !== 'function' )
		return values;

	const array = values || [];

	/* eslint-disable jsdoc/no-undefined-types */
	return /** @type {T[]} */ array[
		/* eslint-enable jsdoc/no-undefined-types */
		index >= array.length ? array.length - 1 : index
	];
}
