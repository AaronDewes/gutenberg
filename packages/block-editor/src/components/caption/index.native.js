/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { createBlock } from '@aarondewes/wp-blocks';
import { RichText } from '@aarondewes/wp-block-editor';
import { __ } from '@aarondewes/wp-i18n';

const Caption = ( {
	accessibilityLabelCreator,
	accessible,
	inlineToolbar,
	isSelected,
	onBlur,
	onChange,
	onFocus,
	placeholder = __( 'Add caption' ),
	placeholderTextColor,
	shouldDisplay = true,
	style,
	value,
	insertBlocksAfter = () => {},
} ) => (
	<View
		accessibilityLabel={
			accessibilityLabelCreator
				? accessibilityLabelCreator( value )
				: undefined
		}
		accessibilityRole="button"
		accessible={ accessible }
		style={ { flex: 1, display: shouldDisplay ? 'flex' : 'none' } }
	>
		<RichText
			__unstableMobileNoFocusOnMount
			fontSize={ style && style.fontSize ? style.fontSize : 14 }
			inlineToolbar={ inlineToolbar }
			isSelected={ isSelected }
			onBlur={ onBlur }
			onChange={ onChange }
			placeholder={ placeholder }
			placeholderTextColor={ placeholderTextColor }
			rootTagsToEliminate={ [ 'p' ] }
			style={ style }
			tagName="p"
			textAlign="center"
			underlineColorAndroid="transparent"
			unstableOnFocus={ onFocus }
			value={ value }
			__unstableOnSplitAtEnd={ () =>
				insertBlocksAfter( createBlock( 'core/paragraph' ) )
			}
			deleteEnter={ true }
		/>
	</View>
);

export default Caption;
