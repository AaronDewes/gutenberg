/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Spinner } from '@aarondewes/wp-components';
import { compose } from '@aarondewes/wp-compose';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';
import { store as coreStore } from '@aarondewes/wp-core-data';
import { withSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import DownloadableBlocksList from '../downloadable-blocks-list';
import DownloadableBlocksInserterPanel from './inserter-panel';
import DownloadableBlocksNoResults from './no-results';
import { store as blockDirectoryStore } from '../../store';

function DownloadableBlocksPanel( {
	downloadableItems,
	onSelect,
	onHover,
	hasLocalBlocks,
	hasPermission,
	isLoading,
	isTyping,
} ) {
	if ( typeof hasPermission === 'undefined' || isLoading || isTyping ) {
		return (
			<>
				{ hasPermission && ! hasLocalBlocks && (
					<>
						<p className="block-directory-downloadable-blocks-panel__no-local">
							{ __(
								'No results available from your installed blocks.'
							) }
						</p>
						<div className="block-editor-inserter__quick-inserter-separator" />
					</>
				) }
				<div className="block-directory-downloadable-blocks-panel has-blocks-loading">
					<Spinner />
				</div>
			</>
		);
	}

	if ( false === hasPermission ) {
		if ( ! hasLocalBlocks ) {
			return <DownloadableBlocksNoResults />;
		}

		return null;
	}

	return !! downloadableItems.length ? (
		<DownloadableBlocksInserterPanel
			downloadableItems={ downloadableItems }
			hasLocalBlocks={ hasLocalBlocks }
		>
			<DownloadableBlocksList
				items={ downloadableItems }
				onSelect={ onSelect }
				onHover={ onHover }
			/>
		</DownloadableBlocksInserterPanel>
	) : (
		! hasLocalBlocks && <DownloadableBlocksNoResults />
	);
}

export default compose( [
	withSelect( ( select, { filterValue, rootClientId = null } ) => {
		const {
			getDownloadableBlocks,
			isRequestingDownloadableBlocks,
		} = select( blockDirectoryStore );
		const { canInsertBlockType } = select( blockEditorStore );

		const hasPermission = select( coreStore ).canUser(
			'read',
			'block-directory/search'
		);

		function getInstallableBlocks( term ) {
			return getDownloadableBlocks( term ).filter( ( block ) =>
				canInsertBlockType( block, rootClientId, true )
			);
		}

		const downloadableItems = hasPermission
			? getInstallableBlocks( filterValue )
			: [];
		const isLoading = isRequestingDownloadableBlocks( filterValue );

		return {
			downloadableItems,
			hasPermission,
			isLoading,
		};
	} ),
] )( DownloadableBlocksPanel );
