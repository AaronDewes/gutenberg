/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat } from '@aarondewes/wp-rich-text';
import {
	RichTextShortcut,
	__unstableRichTextInputEvent,
} from '@aarondewes/wp-block-editor';

const name = 'core/underline';

export const underline = {
	name,
	title: __( 'Underline' ),
	tagName: 'span',
	className: null,
	attributes: {
		style: 'style',
	},
	edit( { value, onChange } ) {
		const onToggle = () => {
			onChange(
				toggleFormat( value, {
					type: name,
					attributes: {
						style: 'text-decoration: underline;',
					},
				} )
			);
		};

		return (
			<>
				<RichTextShortcut
					type="primary"
					character="u"
					onUse={ onToggle }
				/>
				<__unstableRichTextInputEvent
					inputType="formatUnderline"
					onInput={ onToggle }
				/>
			</>
		);
	},
};
