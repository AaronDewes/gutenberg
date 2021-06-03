/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@aarondewes/wp-block-editor';

export default function save( { attributes } ) {
	const { textAlign, content } = attributes;

	const className = classnames( {
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

	return (
		<pre { ...useBlockProps.save( { className } ) }>
			<RichText.Content value={ content } />
		</pre>
	);
}
