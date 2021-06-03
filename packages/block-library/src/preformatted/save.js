/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@aarondewes/wp-block-editor';

export default function save( { attributes } ) {
	const { content } = attributes;

	return (
		<pre { ...useBlockProps.save() }>
			<RichText.Content value={ content } />
		</pre>
	);
}
