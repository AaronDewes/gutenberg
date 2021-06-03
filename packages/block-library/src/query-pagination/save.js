/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@aarondewes/wp-block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
}
