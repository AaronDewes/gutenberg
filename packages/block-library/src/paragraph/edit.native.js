/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { createBlock } from '@aarondewes/wp-blocks';
import {
	AlignmentControl,
	BlockControls,
	RichText,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { useCallback } from '@aarondewes/wp-element';
import { useSelect } from '@aarondewes/wp-data';

const name = 'core/paragraph';

function ParagraphBlock( {
	attributes,
	mergeBlocks,
	onReplace,
	setAttributes,
	mergedStyle,
	style,
	clientId,
} ) {
	const isRTL = useSelect( ( select ) => {
		return !! select( blockEditorStore ).getSettings().isRTL;
	}, [] );

	const { align, content, placeholder } = attributes;

	const styles = {
		...mergedStyle,
		...style,
	};

	const onAlignmentChange = useCallback( ( nextAlign ) => {
		setAttributes( { align: nextAlign } );
	}, [] );
	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					isRTL={ isRTL }
					onChange={ onAlignmentChange }
				/>
			</BlockControls>
			<RichText
				identifier="content"
				tagName="p"
				value={ content }
				deleteEnter={ true }
				style={ styles }
				onChange={ ( nextContent ) => {
					setAttributes( {
						content: nextContent,
					} );
				} }
				onSplit={ ( value, isOriginal ) => {
					let newAttributes;

					if ( isOriginal || value ) {
						newAttributes = {
							...attributes,
							content: value,
						};
					}

					const block = createBlock( name, newAttributes );

					if ( isOriginal ) {
						block.clientId = clientId;
					}

					return block;
				} }
				onMerge={ mergeBlocks }
				onReplace={ onReplace }
				onRemove={ onReplace ? () => onReplace( [] ) : undefined }
				placeholder={ placeholder || __( 'Start writing…' ) }
				textAlign={ align }
			/>
		</>
	);
}

export default ParagraphBlock;
