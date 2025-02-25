/**
 * External dependencies
 */
import { Platform, SafeAreaView, View } from 'react-native';
import SafeArea from 'react-native-safe-area';

/**
 * WordPress dependencies
 */
import { Component } from '@aarondewes/wp-element';
import { withSelect } from '@aarondewes/wp-data';
import { BottomSheetSettings, FloatingToolbar } from '@aarondewes/wp-block-editor';
import { compose, withPreferredColorScheme } from '@aarondewes/wp-compose';
import {
	HTMLTextInput,
	KeyboardAvoidingView,
	NoticeList,
	Tooltip,
	__unstableAutocompletionItemsSlot as AutocompletionItemsSlot,
} from '@aarondewes/wp-components';
import { AutosaveMonitor, store as editorStore } from '@aarondewes/wp-editor';
import { sendNativeEditorDidLayout } from '@aarondewes/wp-react-native-bridge';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import headerToolbarStyles from '../header/header-toolbar/style.scss';
import Header from '../header';
import VisualEditor from '../visual-editor';
import { store as editPostStore } from '../../store';

class Layout extends Component {
	constructor() {
		super( ...arguments );

		this.onSafeAreaInsetsUpdate = this.onSafeAreaInsetsUpdate.bind( this );
		this.onRootViewLayout = this.onRootViewLayout.bind( this );

		this.state = {
			rootViewHeight: 0,
			safeAreaInsets: { top: 0, bottom: 0, right: 0, left: 0 },
		};

		SafeArea.getSafeAreaInsetsForRootView().then(
			this.onSafeAreaInsetsUpdate
		);
	}

	componentDidMount() {
		this._isMounted = true;
		SafeArea.addEventListener(
			'safeAreaInsetsForRootViewDidChange',
			this.onSafeAreaInsetsUpdate
		);
	}

	componentWillUnmount() {
		SafeArea.removeEventListener(
			'safeAreaInsetsForRootViewDidChange',
			this.onSafeAreaInsetsUpdate
		);
		this._isMounted = false;
	}

	onSafeAreaInsetsUpdate( result ) {
		const { safeAreaInsets } = result;
		if ( this._isMounted ) {
			this.setState( { safeAreaInsets } );
		}
	}

	onRootViewLayout( event ) {
		if ( this._isMounted ) {
			this.setHeightState( event );
		}
	}

	setHeightState( event ) {
		const { height } = event.nativeEvent.layout;
		if ( height !== this.state.rootViewHeight ) {
			this.setState(
				{ rootViewHeight: height },
				sendNativeEditorDidLayout
			);
		}
	}

	renderHTML() {
		return <HTMLTextInput parentHeight={ this.state.rootViewHeight } />;
	}

	renderVisual() {
		const { isReady } = this.props;

		if ( ! isReady ) {
			return null;
		}

		return <VisualEditor setTitleRef={ this.props.setTitleRef } />;
	}

	render() {
		const { getStylesFromColorScheme, mode } = this.props;

		const isHtmlView = mode === 'text';

		// add a margin view at the bottom for the header
		const marginBottom =
			Platform.OS === 'android' && ! isHtmlView
				? headerToolbarStyles.container.height
				: 0;

		const toolbarKeyboardAvoidingViewStyle = {
			...styles.toolbarKeyboardAvoidingView,
			left: this.state.safeAreaInsets.left,
			right: this.state.safeAreaInsets.right,
			bottom: this.state.safeAreaInsets.bottom,
		};

		return (
			<Tooltip.Slot>
				<SafeAreaView
					style={ getStylesFromColorScheme(
						styles.container,
						styles.containerDark
					) }
					onLayout={ this.onRootViewLayout }
				>
					<AutosaveMonitor disableIntervalChecks />
					<View
						style={ getStylesFromColorScheme(
							styles.background,
							styles.backgroundDark
						) }
					>
						{ isHtmlView ? this.renderHTML() : this.renderVisual() }
						{ ! isHtmlView && Platform.OS === 'android' && (
							<FloatingToolbar />
						) }
						<NoticeList />
					</View>
					<View
						style={ {
							flex: 0,
							flexBasis: marginBottom,
							height: marginBottom,
						} }
					/>
					{ ! isHtmlView && (
						<KeyboardAvoidingView
							parentHeight={ this.state.rootViewHeight }
							style={ toolbarKeyboardAvoidingViewStyle }
							withAnimatedHeight
						>
							{ Platform.OS === 'ios' && (
								<>
									<AutocompletionItemsSlot />
									<FloatingToolbar />
								</>
							) }
							<Header />
							<BottomSheetSettings />
						</KeyboardAvoidingView>
					) }
					{ Platform.OS === 'android' && <AutocompletionItemsSlot /> }
				</SafeAreaView>
			</Tooltip.Slot>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { __unstableIsEditorReady: isEditorReady } = select(
			editorStore
		);
		const { getEditorMode } = select( editPostStore );
		return {
			isReady: isEditorReady(),
			mode: getEditorMode(),
		};
	} ),
	withPreferredColorScheme,
] )( Layout );
