/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useBlockProps, PlainText } from '@aarondewes/wp-block-editor';

export default function QueryPaginationNextEdit( {
	attributes: { label },
	setAttributes,
} ) {
	return (
		<PlainText
			__experimentalVersion={ 2 }
			tagName="a"
			aria-label={ __( 'Next page link' ) }
			placeholder={ __( 'Next Page' ) }
			value={ label }
			onChange={ ( newLabel ) => setAttributes( { label: newLabel } ) }
			{ ...useBlockProps() }
		/>
	);
}
