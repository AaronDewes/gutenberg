/**
 * External dependencies
 */
import { ScrollView, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { useRef } from '@aarondewes/wp-element';
import { compose, withPreferredColorScheme } from '@aarondewes/wp-compose';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { withViewportMatch } from '@aarondewes/wp-viewport';
import { __ } from '@aarondewes/wp-i18n';
import {
	Inserter,
	BlockToolbar,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { Toolbar, ToolbarButton } from '@aarondewes/wp-components';
import {
	keyboardClose,
	undo as undoIcon,
	redo as redoIcon,
} from '@aarondewes/wp-icons';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { store as editPostStore } from '../../../store';

function HeaderToolbar( {
	hasRedo,
	hasUndo,
	redo,
	undo,
	showInserter,
	showKeyboardHideButton,
	getStylesFromColorScheme,
	onHideKeyboard,
	isRTL,
} ) {
	const scrollViewRef = useRef( null );
	const scrollToStart = () => {
		scrollViewRef.current.scrollTo( { x: 0 } );
	};
	const renderHistoryButtons = () => {
		const buttons = [
			/* TODO: replace with EditorHistoryRedo and EditorHistoryUndo */
			<ToolbarButton
				key="undoButton"
				title={ __( 'Undo' ) }
				icon={ ! isRTL ? undoIcon : redoIcon }
				isDisabled={ ! hasUndo }
				onClick={ undo }
				extraProps={ {
					hint: __( 'Double tap to undo last change' ),
				} }
			/>,
			<ToolbarButton
				key="redoButton"
				title={ __( 'Redo' ) }
				icon={ ! isRTL ? redoIcon : undoIcon }
				isDisabled={ ! hasRedo }
				onClick={ redo }
				extraProps={ {
					hint: __( 'Double tap to redo last change' ),
				} }
			/>,
		];

		return isRTL ? buttons.reverse() : buttons;
	};

	return (
		<View
			style={ getStylesFromColorScheme(
				styles.container,
				styles.containerDark
			) }
		>
			<ScrollView
				ref={ scrollViewRef }
				onContentSizeChange={ scrollToStart }
				horizontal={ true }
				showsHorizontalScrollIndicator={ false }
				keyboardShouldPersistTaps="always"
				alwaysBounceHorizontal={ false }
				contentContainerStyle={ styles.scrollableContent }
			>
				<Inserter disabled={ ! showInserter } />
				{ renderHistoryButtons() }
				<BlockToolbar />
			</ScrollView>
			{ showKeyboardHideButton && (
				<Toolbar passedStyle={ styles.keyboardHideContainer }>
					<ToolbarButton
						title={ __( 'Hide keyboard' ) }
						icon={ keyboardClose }
						onClick={ onHideKeyboard }
						extraProps={ {
							hint: __( 'Tap to hide the keyboard' ),
						} }
					/>
				</Toolbar>
			) }
		</View>
	);
}

export default compose( [
	withSelect( ( select ) => ( {
		hasRedo: select( editorStore ).hasEditorRedo(),
		hasUndo: select( editorStore ).hasEditorUndo(),
		// This setting (richEditingEnabled) should not live in the block editor's setting.
		showInserter:
			select( editPostStore ).getEditorMode() === 'visual' &&
			select( editorStore ).getEditorSettings().richEditingEnabled,
		isTextModeEnabled: select( editPostStore ).getEditorMode() === 'text',
		isRTL: select( blockEditorStore ).getSettings().isRTL,
	} ) ),
	withDispatch( ( dispatch ) => {
		const { clearSelectedBlock } = dispatch( blockEditorStore );
		const { togglePostTitleSelection } = dispatch( editorStore );

		return {
			redo: dispatch( editorStore ).redo,
			undo: dispatch( editorStore ).undo,
			onHideKeyboard() {
				clearSelectedBlock();
				togglePostTitleSelection( false );
			},
		};
	} ),
	withViewportMatch( { isLargeViewport: 'medium' } ),
	withPreferredColorScheme,
] )( HeaderToolbar );
