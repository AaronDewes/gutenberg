/**
 * External dependencies
 */
import {
	KeyboardAvoidingView as IOSKeyboardAvoidingView,
	Animated,
	Keyboard,
	Dimensions,
	View,
} from 'react-native';
import SafeArea from 'react-native-safe-area';

/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@aarondewes/wp-element';
import { useResizeObserver } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

const AnimatedKeyboardAvoidingView = Animated.createAnimatedComponent(
	IOSKeyboardAvoidingView
);

const MIN_HEIGHT = 44;

export const KeyboardAvoidingView = ( {
	parentHeight,
	style,
	withAnimatedHeight = false,
	...otherProps
} ) => {
	const [ resizeObserver, sizes ] = useResizeObserver();
	const [ isKeyboardOpen, setIsKeyboardOpen ] = useState( false );
	const [ safeAreaBottomInset, setSafeAreaBottomInset ] = useState( 0 );
	const { height = 0 } = sizes || {};

	const animatedHeight = useRef( new Animated.Value( MIN_HEIGHT ) ).current;

	const { height: fullHeight } = Dimensions.get( 'screen' );
	const keyboardVerticalOffset = fullHeight - parentHeight;

	useEffect( () => {
		SafeArea.getSafeAreaInsetsForRootView().then(
			( { safeAreaInsets } ) => {
				setSafeAreaBottomInset( safeAreaInsets.bottom );
			}
		);
		SafeArea.addEventListener(
			'safeAreaInsetsForRootViewDidChange',
			onSafeAreaInsetsUpdate
		);
		Keyboard.addListener( 'keyboardWillShow', onKeyboardWillShow );
		Keyboard.addListener( 'keyboardWillHide', onKeyboardWillHide );

		return () => {
			SafeArea.removeEventListener(
				'safeAreaInsetsForRootViewDidChange',
				onSafeAreaInsetsUpdate
			);
			Keyboard.removeListener( 'keyboardWillShow', onKeyboardWillShow );
			Keyboard.removeListener( 'keyboardWillHide', onKeyboardWillHide );
		};
	}, [] );

	function onSafeAreaInsetsUpdate( { safeAreaInsets } ) {
		setSafeAreaBottomInset( safeAreaInsets.bottom );
	}

	function onKeyboardWillShow( { endCoordinates } ) {
		setIsKeyboardOpen( true );
		animatedHeight.setValue( endCoordinates.height + MIN_HEIGHT );
	}

	function onKeyboardWillHide( { duration, startCoordinates } ) {
		// The startCoordinates.height is set to wrong value when we use cmd + k for hide the keyboard (Have no idea why).
		// Because of that the `setIsKeyboardOpened` is not invoked and the state of keyboard is wrong.
		// The keyboardIsOpenBreakpoint use 100 as a fallback if the startCoordinates.height is too small (cmd + k case)
		const keyboardIsOpenBreakpoint =
			startCoordinates.height > 100 ? startCoordinates.height / 3 : 100;
		const animatedListenerId = animatedHeight.addListener(
			( { value } ) => {
				if ( value < keyboardIsOpenBreakpoint ) {
					setIsKeyboardOpen( false );
				}
			}
		);

		Animated.timing( animatedHeight, {
			toValue: MIN_HEIGHT,
			duration,
			useNativeDriver: false,
		} ).start( () => {
			animatedHeight.removeListener( animatedListenerId );
		} );
	}

	return (
		<AnimatedKeyboardAvoidingView
			{ ...otherProps }
			behavior="padding"
			keyboardVerticalOffset={ keyboardVerticalOffset }
			style={
				withAnimatedHeight
					? [
							style,
							{
								height: animatedHeight,
								marginBottom: isKeyboardOpen
									? -safeAreaBottomInset
									: 0,
							},
					  ]
					: style
			}
		>
			<View
				style={ [
					{
						top: -height + MIN_HEIGHT,
					},
					styles.animatedChildStyle,
					! withAnimatedHeight && styles.defaultChildStyle,
				] }
			>
				{ resizeObserver }
				{ otherProps.children }
			</View>
		</AnimatedKeyboardAvoidingView>
	);
};

export default KeyboardAvoidingView;
