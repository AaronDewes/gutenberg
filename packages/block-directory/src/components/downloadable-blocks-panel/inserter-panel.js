/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@aarondewes/wp-i18n';
import { useEffect } from '@aarondewes/wp-element';
import { speak } from '@aarondewes/wp-a11y';

function DownloadableBlocksInserterPanel( {
	children,
	downloadableItems,
	hasLocalBlocks,
} ) {
	const count = downloadableItems.length;
	useEffect( () => {
		speak(
			sprintf(
				/* translators: %d: number of available blocks. */
				_n(
					'%d additional block is available to install.',
					'%d additional blocks are available to install.',
					count
				),
				count
			)
		);
	}, [ count ] );

	return (
		<>
			{ ! hasLocalBlocks && (
				<p className="block-directory-downloadable-blocks-panel__no-local">
					{ __( 'No results available from your installed blocks.' ) }
				</p>
			) }

			<div className="block-editor-inserter__quick-inserter-separator" />

			<div className="block-directory-downloadable-blocks-panel">
				<div className="block-directory-downloadable-blocks-panel__header">
					<h2 className="block-directory-downloadable-blocks-panel__title">
						{ __( 'Available to install' ) }
					</h2>
					<p className="block-directory-downloadable-blocks-panel__description">
						{ __(
							'Select a block to install and add it to your post.'
						) }
					</p>
				</div>
				{ children }
			</div>
		</>
	);
}

export default DownloadableBlocksInserterPanel;
