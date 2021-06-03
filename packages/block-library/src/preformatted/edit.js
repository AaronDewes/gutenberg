/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { RichText, useBlockProps } from '@aarondewes/wp-block-editor';

export default function PreformattedEdit( {
	attributes,
	mergeBlocks,
	setAttributes,
	onRemove,
} ) {
	const { content } = attributes;
	const blockProps = useBlockProps();

	return (
		<RichText
			tagName="pre"
			identifier="content"
			preserveWhiteSpace
			value={ content }
			onChange={ ( nextContent ) => {
				setAttributes( {
					content: nextContent,
				} );
			} }
			onRemove={ onRemove }
			aria-label={ __( 'Preformatted text' ) }
			placeholder={ __( 'Write preformatted text…' ) }
			onMerge={ mergeBlocks }
			{ ...blockProps }
			__unstablePastePlainText
		/>
	);
}
