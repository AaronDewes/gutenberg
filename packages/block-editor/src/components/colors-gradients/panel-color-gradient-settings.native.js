/**
 * External dependencies
 */
import { useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { ColorControl, PanelBody } from '@aarondewes/wp-components';
import { useMemo } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import { blockSettingsScreens } from '../block-settings';

export default function PanelColorGradientSettings( { settings, title } ) {
	const navigation = useNavigation();

	const mappedSettings = useMemo( () => {
		return settings.map(
			( {
				onColorChange,
				colorValue,
				onGradientChange,
				gradientValue,
				label,
			} ) => (
				<ColorControl
					onPress={ () => {
						navigation.navigate( blockSettingsScreens.color, {
							onColorChange,
							colorValue: gradientValue || colorValue,
							gradientValue,
							onGradientChange,
							label,
						} );
					} }
					key={ `color-setting-${ label }` }
					label={ label }
					color={ gradientValue || colorValue }
				/>
			)
		);
	}, [ settings ] );

	return <PanelBody title={ title }>{ mappedSettings }</PanelBody>;
}
