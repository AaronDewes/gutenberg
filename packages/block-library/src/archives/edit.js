/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl, Disabled } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { InspectorControls, useBlockProps } from '@aarondewes/wp-block-editor';
import ServerSideRender from '@aarondewes/wp-server-side-render';

export default function ArchivesEdit( { attributes, setAttributes } ) {
	const { showPostCounts, displayAsDropdown } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Archives settings' ) }>
					<ToggleControl
						label={ __( 'Display as dropdown' ) }
						checked={ displayAsDropdown }
						onChange={ () =>
							setAttributes( {
								displayAsDropdown: ! displayAsDropdown,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Show post counts' ) }
						checked={ showPostCounts }
						onChange={ () =>
							setAttributes( {
								showPostCounts: ! showPostCounts,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<Disabled>
					<ServerSideRender
						block="core/archives"
						attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
	);
}
