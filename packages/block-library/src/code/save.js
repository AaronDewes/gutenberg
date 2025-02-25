/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@aarondewes/wp-block-editor';

/**
 * Internal dependencies
 */
import { escape } from './utils';

export default function save( { attributes } ) {
	return (
		<pre { ...useBlockProps.save() }>
			<RichText.Content
				tagName="code"
				value={ escape( attributes.content ) }
			/>
		</pre>
	);
}
