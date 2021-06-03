/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { RichText, useBlockProps } from '@aarondewes/wp-block-editor';

export default function CodeEdit( { attributes, setAttributes, onRemove } ) {
	const blockProps = useBlockProps();
	return (
		<pre { ...blockProps }>
			<RichText
				tagName="code"
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				onRemove={ onRemove }
				placeholder={ __( 'Write code…' ) }
				aria-label={ __( 'Code' ) }
				preserveWhiteSpace
				__unstablePastePlainText
			/>
		</pre>
	);
}
