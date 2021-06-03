/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { InspectorControls, PanelColorSettings } from '@aarondewes/wp-block-editor';

const SeparatorSettings = ( { color, setColor } ) => (
	<InspectorControls>
		<PanelColorSettings
			title={ __( 'Color' ) }
			colorSettings={ [
				{
					value: color.color,
					onChange: setColor,
					label: __( 'Color' ),
				},
			] }
		></PanelColorSettings>
	</InspectorControls>
);

export default SeparatorSettings;
