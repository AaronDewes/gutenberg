/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@aarondewes/wp-components';
import { InspectorControls } from '@aarondewes/wp-block-editor';

/**
 * Internal dependencies
 */
import { MIN_PREVIEW_HEIGHT, MAX_PREVIEW_HEIGHT } from './edit';

export default function FileBlockInspector( {
	hrefs,
	openInNewWindow,
	showDownloadButton,
	changeLinkDestinationOption,
	changeOpenInNewWindow,
	changeShowDownloadButton,
	displayPreview,
	changeDisplayPreview,
	previewHeight,
	changePreviewHeight,
} ) {
	const { href, textLinkHref, attachmentPage } = hrefs;

	let linkDestinationOptions = [ { value: href, label: __( 'URL' ) } ];
	if ( attachmentPage ) {
		linkDestinationOptions = [
			{ value: href, label: __( 'Media file' ) },
			{ value: attachmentPage, label: __( 'Attachment page' ) },
		];
	}

	return (
		<>
			<InspectorControls>
				{ href.endsWith( '.pdf' ) && (
					<PanelBody title={ __( 'PDF settings' ) }>
						<ToggleControl
							label={ __( 'Show inline embed' ) }
							help={
								displayPreview
									? __(
											"Note: Most phone and tablet browsers won't display embedded PDFs."
									  )
									: null
							}
							checked={ !! displayPreview }
							onChange={ changeDisplayPreview }
						/>
						<RangeControl
							label={ __( 'Height in pixels' ) }
							min={ MIN_PREVIEW_HEIGHT }
							max={ Math.max(
								MAX_PREVIEW_HEIGHT,
								previewHeight
							) }
							value={ previewHeight }
							onChange={ changePreviewHeight }
						/>
					</PanelBody>
				) }
				<PanelBody title={ __( 'Text link settings' ) }>
					<SelectControl
						label={ __( 'Link to' ) }
						value={ textLinkHref }
						options={ linkDestinationOptions }
						onChange={ changeLinkDestinationOption }
					/>
					<ToggleControl
						label={ __( 'Open in new tab' ) }
						checked={ openInNewWindow }
						onChange={ changeOpenInNewWindow }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Download button settings' ) }>
					<ToggleControl
						label={ __( 'Show download button' ) }
						checked={ showDownloadButton }
						onChange={ changeShowDownloadButton }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
