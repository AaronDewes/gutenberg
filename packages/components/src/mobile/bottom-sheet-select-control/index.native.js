/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { useNavigation } from '@react-navigation/native';
import { useState } from '@aarondewes/wp-element';
import { Icon, chevronRight, check } from '@aarondewes/wp-icons';
import { __, sprintf } from '@aarondewes/wp-i18n';
import { BottomSheet } from '@aarondewes/wp-components';
/**
 * Internal dependencies
 */
import styles from './style.scss';

const BottomSheetSelectControl = ( {
	label,
	options: items,
	onChange,
	value: selectedValue,
} ) => {
	const [ showSubSheet, setShowSubSheet ] = useState( false );
	const navigation = useNavigation();

	const onChangeValue = ( value ) => {
		return () => {
			goBack();
			onChange( value );
		};
	};

	const selectedOption = items.find(
		( option ) => option.value === selectedValue
	);

	const goBack = () => {
		setShowSubSheet( false );
		navigation.goBack();
	};

	const openSubSheet = () => {
		navigation.navigate( BottomSheet.SubSheet.screenName );
		setShowSubSheet( true );
	};

	return (
		<BottomSheet.SubSheet
			navigationButton={
				<BottomSheet.Cell
					label={ label }
					separatorType="none"
					value={ selectedOption.label }
					onPress={ openSubSheet }
					accessibilityRole={ 'button' }
					accessibilityLabel={ selectedOption.label }
					accessibilityHint={ sprintf(
						// translators: %s: Select control button label e.g. "Button width"
						__( 'Navigates to select %s' ),
						selectedOption.label
					) }
				>
					<Icon icon={ chevronRight }></Icon>
				</BottomSheet.Cell>
			}
			showSheet={ showSubSheet }
		>
			<>
				<BottomSheet.NavigationHeader
					screen={ label }
					leftButtonOnPress={ goBack }
				/>
				<View style={ styles.selectControl }>
					{ items.map( ( item, index ) => (
						<BottomSheet.Cell
							customActionButton
							separatorType="none"
							label={ item.label }
							onPress={ onChangeValue( item.value ) }
							leftAlign={ true }
							key={ index }
							accessibilityRole={ 'button' }
							accessibilityLabel={
								item.value === selectedValue
									? sprintf(
											// translators: %s: Select control option value e.g: "Auto, 25%".
											__( 'Selected: %s' ),
											item.label
									  )
									: item.label
							}
							accessibilityHint={ __( 'Double tap to select' ) }
						>
							{ item.value === selectedValue && (
								<Icon icon={ check }></Icon>
							) }
						</BottomSheet.Cell>
					) ) }
				</View>
			</>
		</BottomSheet.SubSheet>
	);
};

export default BottomSheetSelectControl;
