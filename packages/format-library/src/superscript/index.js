/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat } from '@aarondewes/wp-rich-text';
import { RichTextToolbarButton } from '@aarondewes/wp-block-editor';
import { superscript as superscriptIcon } from '@aarondewes/wp-icons';

const name = 'core/superscript';
const title = __( 'Superscript' );

export const superscript = {
	name,
	title,
	tagName: 'sup',
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
				icon={ superscriptIcon }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
			/>
		);
	},
};
