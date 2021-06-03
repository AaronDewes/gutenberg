/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useEntityProp } from '@aarondewes/wp-core-data';
import {
	AlignmentControl,
	useBlockProps,
	BlockControls,
	RichText,
} from '@aarondewes/wp-block-editor';
import { __ } from '@aarondewes/wp-i18n';

export default function SiteTaglineEdit( { attributes, setAttributes } ) {
	const { textAlign } = attributes;
	const [ siteTagline, setSiteTagline ] = useEntityProp(
		'root',
		'site',
		'description'
	);
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					onChange={ ( newAlign ) =>
						setAttributes( { textAlign: newAlign } )
					}
					value={ textAlign }
				/>
			</BlockControls>

			<RichText
				allowedFormats={ [] }
				onChange={ setSiteTagline }
				aria-label={ __( 'Site tagline text' ) }
				placeholder={ __( 'Write site tagline…' ) }
				tagName="p"
				value={ siteTagline }
				{ ...blockProps }
			/>
		</>
	);
}
