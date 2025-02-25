/**
 * External dependencies
 */
import { filter, includes, isArray } from 'lodash';

/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@aarondewes/wp-blocks';
import { withSelect } from '@aarondewes/wp-data';
import { TextControl } from '@aarondewes/wp-components';
import { __, _n, sprintf } from '@aarondewes/wp-i18n';
import { useState } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import BlockManagerCategory from './category';
import { store as editPostStore } from '../../store';

function BlockManager( {
	blockTypes,
	categories,
	hasBlockSupport,
	isMatchingSearchTerm,
	numberOfHiddenBlocks,
} ) {
	const [ search, setSearch ] = useState( '' );

	// Filtering occurs here (as opposed to `withSelect`) to avoid
	// wasted renders by consequence of `Array#filter` producing
	// a new value reference on each call.
	blockTypes = blockTypes.filter(
		( blockType ) =>
			hasBlockSupport( blockType, 'inserter', true ) &&
			( ! search || isMatchingSearchTerm( blockType, search ) ) &&
			( ! blockType.parent ||
				includes( blockType.parent, 'core/post-content' ) )
	);

	return (
		<div className="edit-post-manage-blocks-modal__content">
			<TextControl
				type="search"
				label={ __( 'Search for a block' ) }
				value={ search }
				onChange={ ( nextSearch ) => setSearch( nextSearch ) }
				className="edit-post-manage-blocks-modal__search"
			/>
			{ !! numberOfHiddenBlocks && (
				<div className="edit-post-manage-blocks-modal__disabled-blocks-count">
					{ sprintf(
						/* translators: %d: number of blocks. */
						_n(
							'%d block is disabled.',
							'%d blocks are disabled.',
							numberOfHiddenBlocks
						),
						numberOfHiddenBlocks
					) }
				</div>
			) }
			<div
				tabIndex="0"
				role="region"
				aria-label={ __( 'Available block types' ) }
				className="edit-post-manage-blocks-modal__results"
			>
				{ blockTypes.length === 0 && (
					<p className="edit-post-manage-blocks-modal__no-results">
						{ __( 'No blocks found.' ) }
					</p>
				) }
				{ categories.map( ( category ) => (
					<BlockManagerCategory
						key={ category.slug }
						title={ category.title }
						blockTypes={ filter( blockTypes, {
							category: category.slug,
						} ) }
					/>
				) ) }
				<BlockManagerCategory
					title={ __( 'Uncategorized' ) }
					blockTypes={ filter(
						blockTypes,
						( { category } ) => ! category
					) }
				/>
			</div>
		</div>
	);
}

export default withSelect( ( select ) => {
	const {
		getBlockTypes,
		getCategories,
		hasBlockSupport,
		isMatchingSearchTerm,
	} = select( blocksStore );
	const { getPreference } = select( editPostStore );
	const hiddenBlockTypes = getPreference( 'hiddenBlockTypes' );
	const numberOfHiddenBlocks =
		isArray( hiddenBlockTypes ) && hiddenBlockTypes.length;

	return {
		blockTypes: getBlockTypes(),
		categories: getCategories(),
		hasBlockSupport,
		isMatchingSearchTerm,
		numberOfHiddenBlocks,
	};
} )( BlockManager );
