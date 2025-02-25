/**
 * External dependencies
 */
import { useRoute } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { memo, useEffect, useContext } from '@aarondewes/wp-element';
import { BottomSheetContext, BottomSheet } from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import PickerScreen from './picker-screen';
import GradientPickerScreen from './gradient-picker-screen';
import PaletteScreen from './palette.screen';

import { colorsUtils } from './utils';

const ColorSettingsMemo = memo(
	( {
		defaultSettings,
		onHandleClosingBottomSheet,
		shouldEnableBottomSheetMaxHeight,
		onColorChange,
		colorValue,
		gradientValue,
		onGradientChange,
		label,
	} ) => {
		useEffect( () => {
			shouldEnableBottomSheetMaxHeight( true );
			onHandleClosingBottomSheet( null );
		}, [] );
		return (
			<BottomSheet.NavigationContainer>
				<BottomSheet.NavigationScreen
					name={ colorsUtils.screens.palette }
					initialParams={ {
						defaultSettings,
						onColorChange,
						colorValue,
						gradientValue,
						onGradientChange,
						label,
					} }
				>
					<PaletteScreen />
				</BottomSheet.NavigationScreen>
				<BottomSheet.NavigationScreen
					name={ colorsUtils.screens.picker }
				>
					<PickerScreen />
				</BottomSheet.NavigationScreen>
				<BottomSheet.NavigationScreen
					name={ colorsUtils.screens.gradientPicker }
				>
					<GradientPickerScreen />
				</BottomSheet.NavigationScreen>
			</BottomSheet.NavigationContainer>
		);
	}
);
function ColorSettings( props ) {
	const route = useRoute();
	const {
		onHandleClosingBottomSheet,
		shouldEnableBottomSheetMaxHeight,
	} = useContext( BottomSheetContext );

	return (
		<ColorSettingsMemo
			onHandleClosingBottomSheet={ onHandleClosingBottomSheet }
			shouldEnableBottomSheetMaxHeight={
				shouldEnableBottomSheetMaxHeight
			}
			{ ...props }
			{ ...route.params }
		/>
	);
}

export default ColorSettings;
