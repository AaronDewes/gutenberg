/**
 * WordPress dependencies
 */
import { useCallback, useRef } from '@aarondewes/wp-element';
import { useViewportMatch } from '@aarondewes/wp-compose';
import {
	ToolSelector,
	__experimentalPreviewOptions as PreviewOptions,
} from '@aarondewes/wp-block-editor';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { PinnedItems } from '@aarondewes/wp-interface';
import { _x, __ } from '@aarondewes/wp-i18n';
import { listView, plus } from '@aarondewes/wp-icons';
import { Button } from '@aarondewes/wp-components';
import { store as keyboardShortcutsStore } from '@aarondewes/wp-keyboard-shortcuts';
import { store as editorStore } from '@aarondewes/wp-editor';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import MoreMenu from './more-menu';
import SaveButton from '../save-button';
import UndoButton from './undo-redo/undo';
import RedoButton from './undo-redo/redo';
import DocumentActions from './document-actions';
import TemplateDetails from '../template-details';
import { store as editSiteStore } from '../../store';

const preventDefault = ( event ) => {
	event.preventDefault();
};

export default function Header( {
	openEntitiesSavedStates,
	isEntitiesSavedStatesOpen,
} ) {
	const inserterButton = useRef();
	const {
		deviceType,
		entityTitle,
		template,
		templateType,
		isInserterOpen,
		isListViewOpen,
		listViewShortcut,
		isLoaded,
	} = useSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType,
			getEditedPostType,
			getEditedPostId,
			isInserterOpened,
			isListViewOpened,
		} = select( editSiteStore );
		const { getEditedEntityRecord } = select( coreStore );
		const { __experimentalGetTemplateInfo: getTemplateInfo } = select(
			editorStore
		);
		const { getShortcutRepresentation } = select( keyboardShortcutsStore );

		const postType = getEditedPostType();
		const postId = getEditedPostId();
		const record = getEditedEntityRecord( 'postType', postType, postId );
		const _entityTitle =
			'wp_template' === postType
				? getTemplateInfo( record ).title
				: record?.slug;
		const _isLoaded = !! postId;

		return {
			deviceType: __experimentalGetPreviewDeviceType(),
			entityTitle: _entityTitle,
			isLoaded: _isLoaded,
			template: record,
			templateType: postType,
			isInserterOpen: isInserterOpened(),
			isListViewOpen: isListViewOpened(),
			listViewShortcut: getShortcutRepresentation(
				'core/edit-site/toggle-list-view'
			),
		};
	}, [] );

	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
		setIsInserterOpened,
		setIsListViewOpened,
	} = useDispatch( editSiteStore );

	const isLargeViewport = useViewportMatch( 'medium' );

	const openInserter = useCallback( () => {
		if ( isInserterOpen ) {
			// Focusing the inserter button closes the inserter popover
			inserterButton.current.focus();
		} else {
			setIsInserterOpened( true );
		}
	}, [ isInserterOpen, setIsInserterOpened ] );

	const toggleListView = useCallback(
		() => setIsListViewOpened( ! isListViewOpen ),
		[ setIsListViewOpened, isListViewOpen ]
	);

	return (
		<div className="edit-site-header">
			<div className="edit-site-header_start">
				<div className="edit-site-header__toolbar">
					<Button
						ref={ inserterButton }
						variant="primary"
						isPressed={ isInserterOpen }
						className="edit-site-header-toolbar__inserter-toggle"
						onMouseDown={ preventDefault }
						onClick={ openInserter }
						icon={ plus }
						label={ _x(
							'Toggle block inserter',
							'Generic label for block inserter button'
						) }
					/>
					{ isLargeViewport && (
						<>
							<ToolSelector />
							<UndoButton />
							<RedoButton />
							<Button
								className="edit-site-header-toolbar__list-view-toggle"
								icon={ listView }
								isPressed={ isListViewOpen }
								/* translators: button label text should, if possible, be under 16 characters. */
								label={ __( 'List View' ) }
								onClick={ toggleListView }
								shortcut={ listViewShortcut }
							/>
						</>
					) }
				</div>
			</div>

			<div className="edit-site-header_center">
				{ 'wp_template' === templateType && (
					<DocumentActions
						entityTitle={ entityTitle }
						entityLabel="template"
						isLoaded={ isLoaded }
					>
						{ ( { onClose } ) => (
							<TemplateDetails
								template={ template }
								onClose={ onClose }
							/>
						) }
					</DocumentActions>
				) }
				{ 'wp_template_part' === templateType && (
					<DocumentActions
						entityTitle={ entityTitle }
						entityLabel="template part"
						isLoaded={ isLoaded }
					/>
				) }
			</div>

			<div className="edit-site-header_end">
				<div className="edit-site-header__actions">
					<PreviewOptions
						deviceType={ deviceType }
						setDeviceType={ setPreviewDeviceType }
					/>
					<SaveButton
						openEntitiesSavedStates={ openEntitiesSavedStates }
						isEntitiesSavedStatesOpen={ isEntitiesSavedStatesOpen }
					/>
					<PinnedItems.Slot scope="core/edit-site" />
					<MoreMenu />
				</div>
			</div>
		</div>
	);
}
