/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat } from '@aarondewes/wp-rich-text';
import { RichTextToolbarButton } from '@aarondewes/wp-block-editor';
import { subscript as subscriptIcon } from '@aarondewes/wp-icons';

const name = 'core/subscript';
const title = __( 'Subscript' );

export const subscript = {
	name,
	title,
	tagName: 'sub',
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
				icon={ subscriptIcon }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
			/>
		);
	},
};
