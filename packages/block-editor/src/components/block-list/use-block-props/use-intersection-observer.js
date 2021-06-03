/**
 * WordPress dependencies
 */
import { useRefEffect } from '@aarondewes/wp-compose';
import { useContext } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import { IntersectionObserver } from '../';

export function useIntersectionObserver() {
	const observer = useContext( IntersectionObserver );
	return useRefEffect(
		( node ) => {
			if ( observer ) {
				observer.observe( node );
				return () => {
					observer.unobserve( node );
				};
			}
		},
		[ observer ]
	);
}
