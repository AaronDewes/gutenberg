/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@aarondewes/wp-compose';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { __, _x } from '@aarondewes/wp-i18n';
import {
	NavigableToolbar,
	ToolSelector,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import {
	TableOfContents,
	EditorHistoryRedo,
	EditorHistoryUndo,
	store as editorStore,
} from '@aarondewes/wp-editor';
import { Button, ToolbarItem } from '@aarondewes/wp-components';
import { listView, plus } from '@aarondewes/wp-icons';
import { useRef, useCallback } from '@aarondewes/wp-element';
import { store as keyboardShortcutsStore } from '@aarondewes/wp-keyboard-shortcuts';

/**
 * Internal dependencies
 */
import TemplateTitle from '../template-title';
import { store as editPostStore } from '../../../store';

const preventDefault = ( event ) => {
	event.preventDefault();
};

function HeaderToolbar() {
	const inserterButton = useRef();
	const { setIsInserterOpened, setIsListViewOpened } = useDispatch(
		editPostStore
	);
	const {
		isInserterEnabled,
		isInserterOpened,
		isTextModeEnabled,
		showIconLabels,
		isListViewOpen,
		listViewShortcut,
	} = useSelect( ( select ) => {
		const {
			hasInserterItems,
			getBlockRootClientId,
			getBlockSelectionEnd,
		} = select( blockEditorStore );
		const { getEditorSettings } = select( editorStore );
		const { getEditorMode, isFeatureActive, isListViewOpened } = select(
			editPostStore
		);
		const { getShortcutRepresentation } = select( keyboardShortcutsStore );

		return {
			// This setting (richEditingEnabled) should not live in the block editor's setting.
			isInserterEnabled:
				getEditorMode() === 'visual' &&
				getEditorSettings().richEditingEnabled &&
				hasInserterItems(
					getBlockRootClientId( getBlockSelectionEnd() )
				),
			isInserterOpened: select( editPostStore ).isInserterOpened(),
			isTextModeEnabled: getEditorMode() === 'text',
			showIconLabels: isFeatureActive( 'showIconLabels' ),
			isListViewOpen: isListViewOpened(),
			listViewShortcut: getShortcutRepresentation(
				'core/edit-post/toggle-block-navigation'
			),
		};
	}, [] );
	const isLargeViewport = useViewportMatch( 'medium' );
	const isWideViewport = useViewportMatch( 'wide' );

	/* translators: accessibility text for the editor toolbar */
	const toolbarAriaLabel = __( 'Document tools' );

	const toggleListView = useCallback(
		() => setIsListViewOpened( ! isListViewOpen ),
		[ setIsListViewOpened, isListViewOpen ]
	);
	const overflowItems = (
		<>
			<ToolbarItem
				as={ TableOfContents }
				hasOutlineItemsDisabled={ isTextModeEnabled }
				repositionDropdown={ showIconLabels && ! isWideViewport }
				showTooltip={ ! showIconLabels }
				variant={ showIconLabels ? 'tertiary' : undefined }
			/>
			<ToolbarItem
				as={ Button }
				className="edit-post-header-toolbar__list-view-toggle"
				icon={ listView }
				disabled={ isTextModeEnabled }
				isPressed={ isListViewOpen }
				/* translators: button label text should, if possible, be under 16 characters. */
				label={ __( 'List View' ) }
				onClick={ toggleListView }
				shortcut={ listViewShortcut }
				showTooltip={ ! showIconLabels }
			/>
		</>
	);
	const openInserter = useCallback( () => {
		if ( isInserterOpened ) {
			// Focusing the inserter button closes the inserter popover
			inserterButton.current.focus();
		} else {
			setIsInserterOpened( true );
		}
	}, [ isInserterOpened, setIsInserterOpened ] );
	return (
		<NavigableToolbar
			className="edit-post-header-toolbar"
			aria-label={ toolbarAriaLabel }
		>
			<div className="edit-post-header-toolbar__left">
				<ToolbarItem
					ref={ inserterButton }
					as={ Button }
					className="edit-post-header-toolbar__inserter-toggle"
					variant="primary"
					isPressed={ isInserterOpened }
					onMouseDown={ preventDefault }
					onClick={ openInserter }
					disabled={ ! isInserterEnabled }
					icon={ plus }
					/* translators: button label text should, if possible, be under 16
			characters. */
					label={ _x(
						'Toggle block inserter',
						'Generic label for block inserter button'
					) }
					showTooltip={ ! showIconLabels }
				>
					{ showIconLabels && __( 'Add' ) }
				</ToolbarItem>
				{ ( isWideViewport || ! showIconLabels ) && (
					<>
						{ isLargeViewport && (
							<ToolbarItem
								as={ ToolSelector }
								showTooltip={ ! showIconLabels }
								variant={
									showIconLabels ? 'tertiary' : undefined
								}
								disabled={ isTextModeEnabled }
							/>
						) }
						<ToolbarItem
							as={ EditorHistoryUndo }
							showTooltip={ ! showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
						<ToolbarItem
							as={ EditorHistoryRedo }
							showTooltip={ ! showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
						{ overflowItems }
					</>
				) }
			</div>

			<TemplateTitle />
		</NavigableToolbar>
	);
}

export default HeaderToolbar;
