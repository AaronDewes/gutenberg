/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Icon, check } from '@aarondewes/wp-icons';
import { usePreferredColorSchemeStyle } from '@aarondewes/wp-compose';
/**
 * Internal dependencies
 */
import Cell from './cell';
import styles from './styles.scss';

export default function BottomSheetColorCell( props ) {
	const { selected, ...cellProps } = props;

	const selectedIconStyle = usePreferredColorSchemeStyle(
		styles.selectedIcon,
		styles.selectedIconDark
	);

	return (
		<Cell
			{ ...cellProps }
			accessibilityRole={ 'radio' }
			accessibilityState={ { selected } }
			accessibilityHint={
				/* translators: accessibility text (hint for selecting option) */
				__( 'Double tap to select the option' )
			}
			editable={ false }
			value={ '' }
		>
			{ selected && (
				<Icon icon={ check } style={ selectedIconStyle }></Icon>
			) }
		</Cell>
	);
}
