/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import {
	ToolbarButton,
	PanelBody,
	ToggleControl,
	ToolbarGroup,
} from '@aarondewes/wp-components';
import { BlockControls, InspectorControls } from '@aarondewes/wp-block-editor';
import { edit } from '@aarondewes/wp-icons';

const EmbedControls = ( {
	blockSupportsResponsive,
	showEditButton,
	themeSupportsResponsive,
	allowResponsive,
	getResponsiveHelp,
	toggleResponsive,
	switchBackToURLInput,
} ) => (
	<>
		<BlockControls>
			<ToolbarGroup>
				{ showEditButton && (
					<ToolbarButton
						className="components-toolbar__control"
						label={ __( 'Edit URL' ) }
						icon={ edit }
						onClick={ switchBackToURLInput }
					/>
				) }
			</ToolbarGroup>
		</BlockControls>
		{ themeSupportsResponsive && blockSupportsResponsive && (
			<InspectorControls>
				<PanelBody
					title={ __( 'Media settings' ) }
					className="blocks-responsive"
				>
					<ToggleControl
						label={ __( 'Resize for smaller devices' ) }
						checked={ allowResponsive }
						help={ getResponsiveHelp }
						onChange={ toggleResponsive }
					/>
				</PanelBody>
			</InspectorControls>
		) }
	</>
);

export default EmbedControls;
