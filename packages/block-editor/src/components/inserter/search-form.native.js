/**
 * External dependencies
 */
import { TextInput, View, TouchableHighlight } from 'react-native';

/**
 * WordPress dependencies
 */
import { useState, useRef } from '@aarondewes/wp-element';
import { usePreferredColorSchemeStyle } from '@aarondewes/wp-compose';
import { __ } from '@aarondewes/wp-i18n';
import { ToolbarButton } from '@aarondewes/wp-components';
import {
	Icon,
	cancelCircleFilled,
	arrowLeft,
	search as searchIcon,
} from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import styles from './style.scss';

function InserterSearchForm( { value, onChange } ) {
	const [ isActive, setIsActive ] = useState( false );

	const inputRef = useRef();

	const searchFormStyle = usePreferredColorSchemeStyle(
		styles.searchForm,
		styles.searchFormDark
	);

	const searchFormInputStyle = usePreferredColorSchemeStyle(
		styles.searchFormInput,
		styles.searchFormInputDark
	);

	const placeholderStyle = usePreferredColorSchemeStyle(
		styles.searchFormPlaceholder,
		styles.searchFormPlaceholderDark
	);

	return (
		<TouchableHighlight accessible={ false }>
			<View style={ searchFormStyle }>
				{ isActive ? (
					<ToolbarButton
						title={ __( 'Cancel search' ) }
						icon={ arrowLeft }
						onClick={ () => {
							inputRef.current.blur();
							onChange( '' );
							setIsActive( false );
						} }
					/>
				) : (
					<ToolbarButton
						title={ __( 'Search block' ) }
						icon={ searchIcon }
						onClick={ () => {
							inputRef.current.focus();
							setIsActive( true );
						} }
					/>
				) }
				<TextInput
					ref={ inputRef }
					style={ searchFormInputStyle }
					placeholderTextColor={ placeholderStyle.color }
					onChangeText={ onChange }
					onFocus={ () => setIsActive( true ) }
					value={ value }
					placeholder={ __( 'Search blocks' ) }
				/>

				{ !! value && (
					<ToolbarButton
						title={ __( 'Clear search' ) }
						icon={ <Icon icon={ cancelCircleFilled } /> }
						onClick={ () => {
							onChange( '' );
						} }
					/>
				) }
			</View>
		</TouchableHighlight>
	);
}

export default InserterSearchForm;
