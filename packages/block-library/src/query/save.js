/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@aarondewes/wp-block-editor';

export default function QuerySave( { attributes: { tagName: Tag = 'div' } } ) {
	return (
		<Tag { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</Tag>
	);
}
