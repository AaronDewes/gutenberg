/**
 * External dependencies
 */
import { cx } from '@emotion/css';

/**
 * WordPress dependencies
 */
import { useMemo } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import { useContextSystem } from '../ui/context';
import * as styles from './styles';

/* eslint-disable jsdoc/valid-types */
/**
 * @param {import('../ui/context').PolymorphicComponentProps<import('./types').Props, 'div'>} props
 */
/* eslint-enable jsdoc/valid-types */
export function useScrollable( props ) {
	const {
		className,
		scrollDirection = 'y',
		smoothScroll = false,
		...otherProps
	} = useContextSystem( props, 'Scrollable' );

	const classes = useMemo(
		() =>
			cx(
				styles.Scrollable,
				styles.scrollableScrollbar,
				smoothScroll && styles.smoothScroll,
				scrollDirection === 'x' && styles.scrollX,
				scrollDirection === 'y' && styles.scrollY,
				scrollDirection === 'auto' && styles.scrollAuto,
				className
			),
		[ className, scrollDirection, smoothScroll ]
	);

	return { ...otherProps, className: classes };
}
