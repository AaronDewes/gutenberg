/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@aarondewes/wp-block-editor';

export default function save( { attributes } ) {
	const { verticalAlignment, width } = attributes;

	const wrapperClasses = classnames( {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	let style;

	if ( width ) {
		// Numbers are handled for backward compatibility as they can be still provided with templates.
		style = { flexBasis: Number.isFinite( width ) ? width + '%' : width };
	}

	return (
		<div
			{ ...useBlockProps.save( {
				className: wrapperClasses,
				style,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
