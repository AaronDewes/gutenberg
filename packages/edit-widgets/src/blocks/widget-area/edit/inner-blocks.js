/**
 * WordPress dependencies
 */
import { useEntityBlockEditor } from '@aarondewes/wp-core-data';
import { InnerBlocks } from '@aarondewes/wp-block-editor';

export default function WidgetAreaInnerBlocks() {
	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'root',
		'postType'
	);
	return (
		<InnerBlocks
			value={ blocks }
			onInput={ onInput }
			onChange={ onChange }
			templateLock={ false }
			renderAppender={ InnerBlocks.DefaultBlockAppender }
		/>
	);
}
