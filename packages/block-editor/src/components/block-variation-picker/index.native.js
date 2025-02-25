/**
 * External dependencies
 */
import {
	ScrollView,
	View,
	Text,
	TouchableWithoutFeedback,
	Platform,
} from 'react-native';

/**
 * WordPress dependencies
 */
import { withSelect, useDispatch } from '@aarondewes/wp-data';
import { compose, usePreferredColorSchemeStyle } from '@aarondewes/wp-compose';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@aarondewes/wp-blocks';
import { __ } from '@aarondewes/wp-i18n';
import {
	PanelBody,
	BottomSheet,
	FooterMessageControl,
	InserterButton,
} from '@aarondewes/wp-components';
import { Icon, close } from '@aarondewes/wp-icons';
import { useMemo } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { store as blockEditorStore } from '../../store';

const hitSlop = { top: 22, bottom: 22, left: 22, right: 22 };

function BlockVariationPicker( { isVisible, onClose, clientId, variations } ) {
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const isIOS = Platform.OS === 'ios';

	const cancelButtonStyle = usePreferredColorSchemeStyle(
		styles.cancelButton,
		styles.cancelButtonDark
	);

	const leftButton = useMemo(
		() => (
			<TouchableWithoutFeedback onPress={ onClose } hitSlop={ hitSlop }>
				<View>
					{ isIOS ? (
						<Text
							style={ cancelButtonStyle }
							maxFontSizeMultiplier={ 2 }
						>
							{ __( 'Cancel' ) }
						</Text>
					) : (
						<Icon
							icon={ close }
							size={ 24 }
							style={ styles.closeIcon }
						/>
					) }
				</View>
			</TouchableWithoutFeedback>
		),
		[ onClose, cancelButtonStyle ]
	);

	const onVariationSelect = ( variation ) => {
		replaceInnerBlocks(
			clientId,
			createBlocksFromInnerBlocksTemplate( variation.innerBlocks )
		);
		onClose();
	};

	return useMemo(
		() => (
			<BottomSheet
				isVisible={ isVisible }
				onClose={ onClose }
				title={ __( 'Select a layout' ) }
				contentStyle={ styles.contentStyle }
				leftButton={ leftButton }
			>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={ false }
					contentContainerStyle={ styles.contentContainerStyle }
					style={ styles.containerStyle }
				>
					{ variations.map( ( v ) => {
						return (
							<InserterButton
								item={ v }
								key={ v.name }
								onSelect={ () => onVariationSelect( v ) }
							/>
						);
					} ) }
				</ScrollView>
				<PanelBody>
					<FooterMessageControl
						label={ __(
							'Note: Column layout may vary between themes and screen sizes'
						) }
					/>
				</PanelBody>
			</BottomSheet>
		),
		[ variations, isVisible, onClose ]
	);
}

export default compose(
	withSelect( ( select, {} ) => {
		const { getBlockVariations } = select( blocksStore );

		return {
			date: getBlockVariations( 'core/columns', 'block' ),
		};
	} )
)( BlockVariationPicker );
