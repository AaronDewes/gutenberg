/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { Button } from '@aarondewes/wp-components';
import { __experimentalLibrary as Library } from '@aarondewes/wp-block-editor';
import { close } from '@aarondewes/wp-icons';
import {
	useViewportMatch,
	__experimentalUseDialog as useDialog,
} from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

export default function InserterSidebar() {
	const { insertionPoint, showMostUsedBlocks } = useSelect( ( select ) => {
		const { isFeatureActive, __experimentalGetInsertionPoint } = select(
			editPostStore
		);
		return {
			insertionPoint: __experimentalGetInsertionPoint(),
			showMostUsedBlocks: isFeatureActive( 'mostUsedBlocks' ),
		};
	}, [] );
	const { setIsInserterOpened } = useDispatch( editPostStore );

	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const [ inserterDialogRef, inserterDialogProps ] = useDialog( {
		onClose: () => setIsInserterOpened( false ),
	} );

	return (
		<div
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="edit-post-editor__inserter-panel"
		>
			<div className="edit-post-editor__inserter-panel-header">
				<Button
					icon={ close }
					onClick={ () => setIsInserterOpened( false ) }
				/>
			</div>
			<div className="edit-post-editor__inserter-panel-content">
				<Library
					showMostUsedBlocks={ showMostUsedBlocks }
					showInserterHelpPanel
					shouldFocusBlock={ isMobileViewport }
					rootClientId={ insertionPoint.rootClientId }
					__experimentalInsertionIndex={
						insertionPoint.insertionIndex
					}
				/>
			</div>
		</div>
	);
}
