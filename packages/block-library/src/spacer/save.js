/**
 * WordPress dependencies
 */
import { useBlockProps } from '@aarondewes/wp-block-editor';

export default function save( { attributes } ) {
	return (
		<div
			{ ...useBlockProps.save( {
				style: { height: attributes.height, width: attributes.width },
				'aria-hidden': true,
			} ) }
		/>
	);
}
