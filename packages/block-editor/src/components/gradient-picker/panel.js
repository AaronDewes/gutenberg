/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { PanelBody } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import GradientPicker from './control';
import useSetting from '../use-setting';

export default function GradientPanel( props ) {
	const gradients = useSetting( 'color.gradients' );
	if ( isEmpty( gradients ) ) {
		return null;
	}
	return (
		<PanelBody title={ __( 'Gradient' ) }>
			<GradientPicker { ...props } />
		</PanelBody>
	);
}
