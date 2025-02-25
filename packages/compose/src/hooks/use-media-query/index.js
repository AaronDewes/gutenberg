/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@aarondewes/wp-element';

/**
 * Runs a media query and returns its value when it changes.
 *
 * @param {string} [query] Media Query.
 * @return {boolean} return value of the media query.
 */
export default function useMediaQuery( query ) {
	const [ match, setMatch ] = useState(
		() =>
			!! (
				query &&
				typeof window !== 'undefined' &&
				window.matchMedia( query ).matches
			)
	);

	useEffect( () => {
		if ( ! query ) {
			return;
		}
		const updateMatch = () =>
			setMatch( window.matchMedia( query ).matches );
		updateMatch();
		const list = window.matchMedia( query );
		list.addListener( updateMatch );
		return () => {
			list.removeListener( updateMatch );
		};
	}, [ query ] );

	return !! query && match;
}
