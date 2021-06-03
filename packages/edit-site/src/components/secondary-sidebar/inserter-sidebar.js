/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@aarondewes/wp-data';
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
import { store as editSiteStore } from '../../store';

export default function InserterSidebar() {
	const { setIsInserterOpened } = useDispatch( editSiteStore );
	const insertionPoint = useSelect(
		( select ) => select( editSiteStore ).__experimentalGetInsertionPoint(),
		[]
	);

	const isMobile = useViewportMatch( 'medium', '<' );
	const [ inserterDialogRef, inserterDialogProps ] = useDialog( {
		onClose: () => setIsInserterOpened( false ),
	} );

	return (
		<div
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="edit-site-editor__inserter-panel"
		>
			<div className="edit-site-editor__inserter-panel-header">
				<Button
					icon={ close }
					onClick={ () => setIsInserterOpened( false ) }
				/>
			</div>
			<div className="edit-site-editor__inserter-panel-content">
				<Library
					showInserterHelpPanel
					shouldFocusBlock={ isMobile }
					rootClientId={ insertionPoint.rootClientId }
					__experimentalInsertionIndex={
						insertionPoint.insertionIndex
					}
				/>
			</div>
		</div>
	);
}
