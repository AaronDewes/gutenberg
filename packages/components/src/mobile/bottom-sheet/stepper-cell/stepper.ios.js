/**
 * External dependencies
 */
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@aarondewes/wp-compose';
import { Icon, minus, plus } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import styles from './style.scss';

function Stepper( {
	getStylesFromColorScheme,
	isMaxValue,
	isMinValue,
	onPressInDecrement,
	onPressInIncrement,
	onPressOut,
	value,
	children,
	shouldDisplayTextInput,
} ) {
	const valueStyle = getStylesFromColorScheme(
		styles.value,
		styles.valueTextDark
	);
	const buttonStyle = getStylesFromColorScheme(
		styles.button,
		styles.buttonDark
	);

	return (
		<View style={ styles.container }>
			{ ! shouldDisplayTextInput && (
				<Text style={ valueStyle }>{ value }</Text>
			) }
			{ children }
			<TouchableOpacity
				disabled={ isMinValue }
				onPressIn={ onPressInDecrement }
				onPressOut={ onPressOut }
				style={ [ buttonStyle, isMinValue ? { opacity: 0.4 } : null ] }
			>
				<Icon icon={ minus } size={ 24 } color={ buttonStyle.color } />
			</TouchableOpacity>
			<TouchableOpacity
				disabled={ isMaxValue }
				onPressIn={ onPressInIncrement }
				onPressOut={ onPressOut }
				style={ [ buttonStyle, isMaxValue ? { opacity: 0.4 } : null ] }
			>
				<Icon icon={ plus } size={ 24 } color={ buttonStyle.color } />
			</TouchableOpacity>
		</View>
	);
}

export default withPreferredColorScheme( Stepper );
