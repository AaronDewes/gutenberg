/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';
import tinycolor from 'tinycolor2';
/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { BottomSheet } from '@aarondewes/wp-components';
import { usePreferredColorSchemeStyle } from '@aarondewes/wp-compose';
import { Icon, check, close } from '@aarondewes/wp-icons';
/**
 * Internal dependencies
 */
import styles from './style.scss';

function ColorPicker( {
	shouldEnableBottomSheetScroll,
	shouldEnableBottomSheetMaxHeight,
	isBottomSheetContentScrolling,
	setColor,
	activeColor,
	isGradientColor,
	onNavigationBack,
	onHandleClosingBottomSheet,
	onBottomSheetClosed,
	onHandleHardwareButtonPress,
	bottomLabelText,
} ) {
	const didMount = useRef( false );
	const isIOS = Platform.OS === 'ios';
	const hitSlop = { top: 22, bottom: 22, left: 22, right: 22 };
	const { h: initH, s: initS, v: initV } =
		! isGradientColor && activeColor
			? tinycolor( activeColor ).toHsv()
			: { h: 0, s: 0.5, v: 0.5 };
	const [ hue, setHue ] = useState( initH );
	const [ sat, setSaturation ] = useState( initS );
	const [ val, setValue ] = useState( initV );
	const [ savedColor ] = useState( activeColor );

	const {
		paddingLeft: spacing,
		height: pickerHeight,
		borderRadius,
	} = styles.picker;
	const { height: pickerPointerSize } = styles.pickerPointer;
	const pickerWidth = BottomSheet.getWidth() - 2 * spacing;

	const applyButtonStyle = usePreferredColorSchemeStyle(
		styles.applyButton,
		styles.applyButtonDark
	);
	const cancelButtonStyle = usePreferredColorSchemeStyle(
		styles.cancelButton,
		styles.cancelButtonDark
	);
	const colorTextStyle = usePreferredColorSchemeStyle(
		styles.colorText,
		styles.colorTextDark
	);
	const selectColorTextStyle = usePreferredColorSchemeStyle(
		styles.selectColorText,
		styles.selectColorTextDark
	);
	const footerStyle = usePreferredColorSchemeStyle(
		styles.footer,
		styles.footerDark
	);

	const currentColor = tinycolor(
		`hsv ${ hue } ${ sat } ${ val }`
	).toHexString();

	useEffect( () => {
		if ( ! didMount.current ) {
			didMount.current = true;
			return;
		}
		setColor( currentColor );
	}, [ currentColor ] );

	useEffect( () => {
		shouldEnableBottomSheetMaxHeight( false );
		onHandleClosingBottomSheet( () => {
			if ( savedColor ) {
				setColor( savedColor );
			}
			if ( onBottomSheetClosed ) {
				onBottomSheetClosed();
			}
		} );
		if ( onHandleHardwareButtonPress ) {
			onHandleHardwareButtonPress( onButtonPress );
		}
	}, [] );

	function onHuePickerChange( { hue: h } ) {
		setHue( h );
	}

	function onSatValPickerChange( { saturation: s, value: v } ) {
		setSaturation( s );
		setValue( v );
	}

	function onButtonPress( action ) {
		onNavigationBack();
		onHandleClosingBottomSheet( null );
		shouldEnableBottomSheetMaxHeight( true );
		setColor( action === 'apply' ? currentColor : savedColor );
		if ( onBottomSheetClosed ) {
			onBottomSheetClosed();
		}
	}

	return (
		<>
			<HsvColorPicker
				huePickerHue={ hue }
				onHuePickerDragMove={ onHuePickerChange }
				onHuePickerPress={
					! isBottomSheetContentScrolling && onHuePickerChange
				}
				satValPickerHue={ hue }
				satValPickerSaturation={ sat }
				satValPickerValue={ val }
				onSatValPickerDragMove={ onSatValPickerChange }
				onSatValPickerPress={
					! isBottomSheetContentScrolling && onSatValPickerChange
				}
				onSatValPickerDragStart={ () => {
					shouldEnableBottomSheetScroll( false );
				} }
				onSatValPickerDragEnd={ () =>
					shouldEnableBottomSheetScroll( true )
				}
				onHuePickerDragStart={ () =>
					shouldEnableBottomSheetScroll( false )
				}
				onHuePickerDragEnd={ () =>
					shouldEnableBottomSheetScroll( true )
				}
				huePickerBarWidth={ pickerWidth }
				huePickerBarHeight={ pickerPointerSize / 2 }
				satValPickerSize={ {
					width: pickerWidth,
					height: pickerHeight,
				} }
				satValPickerSliderSize={ pickerPointerSize * 2 }
				satValPickerBorderRadius={ borderRadius }
				huePickerBorderRadius={ borderRadius }
			/>
			<View style={ footerStyle }>
				<TouchableWithoutFeedback
					onPress={ () => onButtonPress( 'cancel' ) }
					hitSlop={ hitSlop }
				>
					<View>
						{ isIOS ? (
							<Text style={ cancelButtonStyle }>
								{ __( 'Cancel' ) }
							</Text>
						) : (
							<Icon
								icon={ close }
								size={ 24 }
								style={ cancelButtonStyle }
							/>
						) }
					</View>
				</TouchableWithoutFeedback>
				{ bottomLabelText ? (
					<Text style={ selectColorTextStyle }>
						{ bottomLabelText }
					</Text>
				) : (
					<Text style={ colorTextStyle } selectable>
						{ currentColor.toUpperCase() }
					</Text>
				) }
				<TouchableWithoutFeedback
					onPress={ () => onButtonPress( 'apply' ) }
					hitSlop={ hitSlop }
				>
					<View>
						{ isIOS ? (
							<Text style={ applyButtonStyle }>
								{ __( 'Apply' ) }
							</Text>
						) : (
							<Icon
								icon={ check }
								size={ 24 }
								style={ applyButtonStyle }
							/>
						) }
					</View>
				</TouchableWithoutFeedback>
			</View>
		</>
	);
}

export default ColorPicker;
