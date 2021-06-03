/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useBlockProps, PlainText } from '@aarondewes/wp-block-editor';

export default function QueryPaginationPreviousEdit( {
	attributes: { label },
	setAttributes,
} ) {
	return (
		<PlainText
			__experimentalVersion={ 2 }
			tagName="a"
			aria-label={ __( 'Previous page link' ) }
			placeholder={ __( 'Previous Page' ) }
			value={ label }
			onChange={ ( newLabel ) => setAttributes( { label: newLabel } ) }
			{ ...useBlockProps() }
		/>
	);
}
