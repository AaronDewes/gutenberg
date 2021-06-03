/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@aarondewes/wp-compose';
/**
 * Internal dependencies
 */
import Cell from './cell';
import styles from './styles.scss';

function FooterMessageCell( { textAlign = 'left', ...props } ) {
	return (
		<Cell
			{ ...props }
			editable={ false }
			value={ '' }
			accessibilityRole={ 'text' }
			labelStyle={ [ styles.footerMessageCell, { textAlign } ] }
		/>
	);
}

export default withPreferredColorScheme( FooterMessageCell );
