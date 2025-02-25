/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@aarondewes/wp-element';

/*
 * Calculates and renders the format boundary style when the active formats
 * change.
 */
export function useBoundaryStyle( { record } ) {
	const ref = useRef();
	const { activeFormats = [] } = record.current;
	useEffect( () => {
		// There's no need to recalculate the boundary styles if no formats are
		// active, because no boundary styles will be visible.
		if ( ! activeFormats || ! activeFormats.length ) {
			return;
		}

		const boundarySelector = '*[data-rich-text-format-boundary]';
		const element = ref.current.querySelector( boundarySelector );

		if ( ! element ) {
			return;
		}

		const { ownerDocument } = element;
		const { defaultView } = ownerDocument;
		const computedStyle = defaultView.getComputedStyle( element );
		const newColor = computedStyle.color
			.replace( ')', ', 0.2)' )
			.replace( 'rgb', 'rgba' );
		const selector = `.rich-text:focus ${ boundarySelector }`;
		const rule = `background-color: ${ newColor }`;
		const style = `${ selector } {${ rule }}`;
		const globalStyleId = 'rich-text-boundary-style';

		let globalStyle = ownerDocument.getElementById( globalStyleId );

		if ( ! globalStyle ) {
			globalStyle = ownerDocument.createElement( 'style' );
			globalStyle.id = globalStyleId;
			ownerDocument.head.appendChild( globalStyle );
		}

		if ( globalStyle.innerHTML !== style ) {
			globalStyle.innerHTML = style;
		}
	}, [ activeFormats ] );
	return ref;
}
