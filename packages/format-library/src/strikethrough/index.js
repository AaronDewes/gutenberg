/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat } from '@aarondewes/wp-rich-text';
import { RichTextToolbarButton } from '@aarondewes/wp-block-editor';
import { formatStrikethrough } from '@aarondewes/wp-icons';

const name = 'core/strikethrough';
const title = __( 'Strikethrough' );

export const strikethrough = {
	name,
	title,
	tagName: 's',
	className: null,
	edit( { isActive, value, onChange, onFocus } ) {
		function onClick() {
			onChange( toggleFormat( value, { type: name } ) );
			onFocus();
		}

		return (
			<RichTextToolbarButton
				icon={ formatStrikethrough }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
			/>
		);
	},
};
