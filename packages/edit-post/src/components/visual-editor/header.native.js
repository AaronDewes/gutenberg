/**
 * WordPress dependencies
 */
import { memo } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { withDispatch, withSelect } from '@aarondewes/wp-data';
import { compose, withPreferredColorScheme } from '@aarondewes/wp-compose';
import { PostTitle } from '@aarondewes/wp-editor';
import { ReadableContentView } from '@aarondewes/wp-components';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';

/**
 * Internal dependencies
 */
import styles from './style.scss';

const Header = memo(
	function EditorHeader( {
		editTitle,
		setTitleRef,
		title,
		getStylesFromColorScheme,
	} ) {
		const blockHolderFocusedStyle = getStylesFromColorScheme(
			styles.blockHolderFocused,
			styles.blockHolderFocusedDark
		);
		return (
			<ReadableContentView>
				<PostTitle
					innerRef={ setTitleRef }
					title={ title }
					onUpdate={ editTitle }
					placeholder={ __( 'Add title' ) }
					borderStyle={ styles.blockHolderFullBordered }
					focusedBorderColor={ blockHolderFocusedStyle.borderColor }
					accessibilityLabel="post-title"
				/>
			</ReadableContentView>
		);
	},
	( prevProps, nextProps ) => prevProps.title === nextProps.title
);

export default compose( [
	withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );

		return {
			title: getEditedPostAttribute( 'title' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( 'core/editor' );

		const { clearSelectedBlock } = dispatch( blockEditorStore );

		return {
			clearSelectedBlock,
			editTitle( title ) {
				editPost( { title } );
			},
		};
	} ),
	withPreferredColorScheme,
] )( Header );
