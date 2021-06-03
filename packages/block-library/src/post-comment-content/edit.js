/**
 * WordPress dependencies
 */
import { useEntityProp } from '@aarondewes/wp-core-data';
import { useBlockProps } from '@aarondewes/wp-block-editor';

// TODO: JSDOC types
export default function Edit( { attributes, context } ) {
	const { className } = attributes;
	const { commentId } = context;

	const [ content ] = useEntityProp(
		'root',
		'comment',
		'content',
		commentId
	);

	return (
		<div { ...useBlockProps() }>
			<p className={ className }>{ content }</p>
		</div>
	);
}
