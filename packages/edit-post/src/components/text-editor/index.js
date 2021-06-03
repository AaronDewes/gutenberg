/**
 * WordPress dependencies
 */
import {
	PostTextEditor,
	PostTitle,
	TextEditorGlobalKeyboardShortcuts,
	store as editorStore,
} from '@aarondewes/wp-editor';
import { Button } from '@aarondewes/wp-components';
import { withDispatch, withSelect } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { displayShortcut } from '@aarondewes/wp-keycodes';
import { compose } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

function TextEditor( { onExit, isRichEditingEnabled } ) {
	return (
		<div className="edit-post-text-editor">
			{ isRichEditingEnabled && (
				<div className="edit-post-text-editor__toolbar">
					<h2>{ __( 'Editing code' ) }</h2>
					<Button
						variant="tertiary"
						onClick={ onExit }
						shortcut={ displayShortcut.secondary( 'm' ) }
					>
						{ __( 'Exit code editor' ) }
					</Button>
					<TextEditorGlobalKeyboardShortcuts />
				</div>
			) }
			<div className="edit-post-text-editor__body">
				<PostTitle />
				<PostTextEditor />
			</div>
		</div>
	);
}

export default compose(
	withSelect( ( select ) => ( {
		isRichEditingEnabled: select( editorStore ).getEditorSettings()
			.richEditingEnabled,
	} ) ),
	withDispatch( ( dispatch ) => {
		return {
			onExit() {
				dispatch( editPostStore ).switchEditorMode( 'visual' );
			},
		};
	} )
)( TextEditor );
