/**
 * WordPress dependencies
 */
import { Icon } from '@aarondewes/wp-components';
import { withPreferredColorScheme } from '@aarondewes/wp-compose';
import { gallery as icon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

const IconWithColorScheme = withPreferredColorScheme(
	( { getStylesFromColorScheme } ) => {
		const colorSchemeStyles = getStylesFromColorScheme(
			styles.icon,
			styles.iconDark
		);
		return <Icon icon={ icon } { ...colorSchemeStyles } />;
	}
);

export const sharedIcon = <IconWithColorScheme />;
