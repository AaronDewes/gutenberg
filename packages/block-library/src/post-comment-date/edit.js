/**
 * WordPress dependencies
 */
import { useEntityProp } from '@aarondewes/wp-core-data';
import { __experimentalGetSettings, dateI18n } from '@aarondewes/wp-date';
import { InspectorControls, useBlockProps } from '@aarondewes/wp-block-editor';
import { PanelBody, CustomSelectControl } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

export default function Edit( { attributes, context, setAttributes } ) {
	const { className, format } = attributes;
	const { commentId } = context;

	const settings = __experimentalGetSettings();
	const [ siteDateFormat ] = useEntityProp( 'root', 'site', 'date_format' );
	const [ date ] = useEntityProp( 'root', 'comment', 'date', commentId );

	const formatOptions = Object.values( settings.formats ).map(
		( formatOption ) => ( {
			key: formatOption,
			name: dateI18n( formatOption, date ),
		} )
	);
	const resolvedFormat = format || siteDateFormat || settings.formats.date;
	const blockProps = useBlockProps( { className } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Format settings' ) }>
					<CustomSelectControl
						hideLabelFromVision
						label={ __( 'Date Format' ) }
						options={ formatOptions }
						onChange={ ( { selectedItem } ) =>
							setAttributes( {
								format: selectedItem.key,
							} )
						}
						value={ formatOptions.find(
							( option ) => option.key === resolvedFormat
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<time dateTime={ dateI18n( 'c', date ) }>
					{ dateI18n( resolvedFormat, date ) }
				</time>
			</div>
		</>
	);
}
