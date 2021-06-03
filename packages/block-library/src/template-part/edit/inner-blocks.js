/**
 * WordPress dependencies
 */
import { useEntityBlockEditor } from '@aarondewes/wp-core-data';
import {
	InnerBlocks,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	useSetting,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { useSelect } from '@aarondewes/wp-data';
import { useMemo } from '@aarondewes/wp-element';

export default function TemplatePartInnerBlocks( {
	postId: id,
	hasInnerBlocks,
	layout,
	tagName: TagName,
	blockProps,
} ) {
	const themeSupportsLayout = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		return getSettings()?.supportsLayout;
	}, [] );
	const defaultLayout = useSetting( 'layout' ) || {};
	const usedLayout = !! layout && layout.inherit ? defaultLayout : layout;
	const { contentSize, wideSize } = usedLayout;
	const _layout = useMemo( () => {
		if ( themeSupportsLayout ) {
			const alignments =
				contentSize || wideSize
					? [ 'wide', 'full' ]
					: [ 'left', 'center', 'right' ];
			return {
				type: 'default',
				// Find a way to inject this in the support flag code (hooks).
				alignments,
			};
		}
		return undefined;
	}, [ themeSupportsLayout, contentSize, wideSize ] );

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'postType',
		'wp_template_part',
		{ id }
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		value: blocks,
		onInput,
		onChange,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
		__experimentalLayout: _layout,
	} );
	return <TagName { ...innerBlocksProps } />;
}
