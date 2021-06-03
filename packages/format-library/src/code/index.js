/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { toggleFormat, remove, applyFormat } from '@aarondewes/wp-rich-text';
import { RichTextToolbarButton } from '@aarondewes/wp-block-editor';
import { code as codeIcon } from '@aarondewes/wp-icons';

const name = 'core/code';
const title = __( 'Inline code' );

export const code = {
	name,
	title,
	tagName: 'code',
	className: null,
	__unstableInputRule( value ) {
		const BACKTICK = '`';
		const { start, text } = value;
		const characterBefore = text.slice( start - 1, start );

		// Quick check the text for the necessary character.
		if ( characterBefore !== BACKTICK ) {
			return value;
		}

		const textBefore = text.slice( 0, start - 1 );
		const indexBefore = textBefore.lastIndexOf( BACKTICK );

		if ( indexBefore === -1 ) {
			return value;
		}

		const startIndex = indexBefore;
		const endIndex = start - 2;

		if ( startIndex === endIndex ) {
			return value;
		}

		value = remove( value, startIndex, startIndex + 1 );
		value = remove( value, endIndex, endIndex + 1 );
		value = applyFormat( value, { type: name }, startIndex, endIndex );

		return value;
	},
	edit( { value, onChange, onFocus, isActive } ) {
		function onClick() {
			onChange( toggleFormat( value, { type: name } ) );
			onFocus();
		}

		return (
			<RichTextToolbarButton
				icon={ codeIcon }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
			/>
		);
	},
};
