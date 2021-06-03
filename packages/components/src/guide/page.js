/**
 * WordPress dependencies
 */
import { useEffect } from '@aarondewes/wp-element';
import deprecated from '@aarondewes/wp-deprecated';

export default function GuidePage( props ) {
	useEffect( () => {
		deprecated( '<GuidePage>', {
			since: '5.5',
			alternative: 'the `pages` prop in <Guide>',
		} );
	}, [] );

	return <div { ...props } />;
}
