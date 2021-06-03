/**
 * WordPress dependencies
 */
import { forwardRef } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import RovingTabIndexItem from './roving-tab-index-item';

export default forwardRef( function TreeGridItem(
	{ children, ...props },
	ref
) {
	return (
		<RovingTabIndexItem ref={ ref } { ...props }>
			{ children }
		</RovingTabIndexItem>
	);
} );
