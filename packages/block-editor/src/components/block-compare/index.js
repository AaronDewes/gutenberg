/**
 * External dependencies
 */
import classnames from 'classnames';
import { castArray } from 'lodash';
// diff doesn't tree-shake correctly, so we import from the individual
// module here, to avoid including too much of the library
import { diffChars } from 'diff/lib/diff/character';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { getSaveContent, getSaveElement } from '@aarondewes/wp-blocks';

/**
 * Internal dependencies
 */
import BlockView from './block-view';

function BlockCompare( {
	block,
	onKeep,
	onConvert,
	convertor,
	convertButtonText,
} ) {
	function getDifference( originalContent, newContent ) {
		const difference = diffChars( originalContent, newContent );

		return difference.map( ( item, pos ) => {
			const classes = classnames( {
				'block-editor-block-compare__added': item.added,
				'block-editor-block-compare__removed': item.removed,
			} );

			return (
				<span key={ pos } className={ classes }>
					{ item.value }
				</span>
			);
		} );
	}

	function getConvertedContent( convertedBlock ) {
		// The convertor may return an array of items or a single item
		const newBlocks = castArray( convertedBlock );

		// Get converted block details
		const newContent = newBlocks.map( ( item ) =>
			getSaveContent( item.name, item.attributes, item.innerBlocks )
		);
		const renderedContent = newBlocks.map( ( item ) =>
			getSaveElement( item.name, item.attributes, item.innerBlocks )
		);

		return {
			rawContent: newContent.join( '' ),
			renderedContent,
		};
	}

	const original = {
		rawContent: block.originalContent,
		renderedContent: getSaveElement( block.name, block.attributes ),
	};
	const converted = getConvertedContent( convertor( block ) );
	const difference = getDifference(
		original.rawContent,
		converted.rawContent
	);

	return (
		<div className="block-editor-block-compare__wrapper">
			<BlockView
				title={ __( 'Current' ) }
				className="block-editor-block-compare__current"
				action={ onKeep }
				actionText={ __( 'Convert to HTML' ) }
				rawContent={ original.rawContent }
				renderedContent={ original.renderedContent }
			/>

			<BlockView
				title={ __( 'After Conversion' ) }
				className="block-editor-block-compare__converted"
				action={ onConvert }
				actionText={ convertButtonText }
				rawContent={ difference }
				renderedContent={ converted.renderedContent }
			/>
		</div>
	);
}

export default BlockCompare;
