/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat } from '@aarondewes/wp-rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
	__unstableRichTextInputEvent,
} from '@aarondewes/wp-block-editor';
import { formatBold } from '@aarondewes/wp-icons';

const name = 'core/bold';
const title = __( 'Bold' );

export const bold = {
	name,
	title,
	tagName: 'strong',
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
			<>
				<RichTextShortcut
					type="primary"
					character="b"
					onUse={ onToggle }
				/>
				<RichTextToolbarButton
					name="bold"
					icon={ formatBold }
					title={ title }
					onClick={ onClick }
					isActive={ isActive }
					shortcutType="primary"
					shortcutCharacter="b"
				/>
				<__unstableRichTextInputEvent
					inputType="formatBold"
					onInput={ onToggle }
				/>
			</>
		);
	},
};
