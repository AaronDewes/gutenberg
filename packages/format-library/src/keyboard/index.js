/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat } from '@aarondewes/wp-rich-text';
import { RichTextToolbarButton } from '@aarondewes/wp-block-editor';
import { button } from '@aarondewes/wp-icons';

const name = 'core/keyboard';
const title = __( 'Keyboard input' );

export const keyboard = {
	name,
	title,
	tagName: 'kbd',
	className: null,
	edit( { isActive, value, onChange, onFocus } ) {
		function onToggle() {
			onChange( toggleFormat( value, { type: name } ) );
		}

		function onClick() {
			onToggle();
			onFocus();
		}

		return (
			<RichTextToolbarButton
				icon={ button }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
			/>
		);
	},
};
