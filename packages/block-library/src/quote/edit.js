/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import {
	AlignmentControl,
	BlockControls,
	RichText,
	useBlockProps,
} from '@aarondewes/wp-block-editor';
import { BlockQuotation } from '@aarondewes/wp-components';
import { createBlock } from '@aarondewes/wp-blocks';
import { Platform } from '@aarondewes/wp-element';

const isWebPlatform = Platform.OS === 'web';

export default function QuoteEdit( {
	attributes,
	setAttributes,
	isSelected,
	mergeBlocks,
	onReplace,
	className,
	insertBlocksAfter,
	mergedStyle,
} ) {
	const { align, value, citation } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
		style: mergedStyle,
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<BlockQuotation { ...blockProps }>
				<RichText
					identifier="value"
					multiline
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( {
							value: nextValue,
						} )
					}
					onMerge={ mergeBlocks }
					onRemove={ ( forward ) => {
						const hasEmptyCitation =
							! citation || citation.length === 0;
						if ( ! forward && hasEmptyCitation ) {
							onReplace( [] );
						}
					} }
					aria-label={ __( 'Quote text' ) }
					placeholder={
						// translators: placeholder text used for the quote
						__( 'Add quote' )
					}
					onReplace={ onReplace }
					onSplit={ ( piece ) =>
						createBlock( 'core/quote', {
							...attributes,
							value: piece,
						} )
					}
					__unstableOnSplitMiddle={ () =>
						createBlock( 'core/paragraph' )
					}
					textAlign={ align }
				/>
				{ ( ! RichText.isEmpty( citation ) || isSelected ) && (
					<RichText
						identifier="citation"
						tagName={ isWebPlatform ? 'cite' : undefined }
						style={ { display: 'block' } }
						value={ citation }
						onChange={ ( nextCitation ) =>
							setAttributes( {
								citation: nextCitation,
							} )
						}
						__unstableMobileNoFocusOnMount
						aria-label={ __( 'Quote citation text' ) }
						placeholder={
							// translators: placeholder text used for the citation
							__( 'Add citation' )
						}
						className="wp-block-quote__citation"
						textAlign={ align }
						__unstableOnSplitAtEnd={ () =>
							insertBlocksAfter( createBlock( 'core/paragraph' ) )
						}
					/>
				) }
			</BlockQuotation>
		</>
	);
}
