/**
 * WordPress dependencies
 */
import { compose } from '@aarondewes/wp-compose';
import { Popover, Button } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { useCallback, useRef } from '@aarondewes/wp-element';
import { close } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import { store as nuxStore } from '../../store';

function onClick( event ) {
	// Tips are often nested within buttons. We stop propagation so that clicking
	// on a tip doesn't result in the button being clicked.
	event.stopPropagation();
}

export function DotTip( {
	position = 'middle right',
	children,
	isVisible,
	hasNextTip,
	onDismiss,
	onDisable,
} ) {
	const anchorParent = useRef( null );
	const onFocusOutsideCallback = useCallback(
		( event ) => {
			if ( ! anchorParent.current ) {
				return;
			}
			if ( anchorParent.current.contains( event.relatedTarget ) ) {
				return;
			}
			onDisable();
		},
		[ onDisable, anchorParent ]
	);
	if ( ! isVisible ) {
		return null;
	}

	return (
		<Popover
			className="nux-dot-tip"
			position={ position }
			noArrow
			focusOnMount="container"
			shouldAnchorIncludePadding
			role="dialog"
			aria-label={ __( 'Editor tips' ) }
			onClick={ onClick }
			onFocusOutside={ onFocusOutsideCallback }
		>
			<p>{ children }</p>
			<p>
				<Button variant="link" onClick={ onDismiss }>
					{ hasNextTip ? __( 'See next tip' ) : __( 'Got it' ) }
				</Button>
			</p>
			<Button
				className="nux-dot-tip__disable"
				icon={ close }
				label={ __( 'Disable tips' ) }
				onClick={ onDisable }
			/>
		</Popover>
	);
}

export default compose(
	withSelect( ( select, { tipId } ) => {
		const { isTipVisible, getAssociatedGuide } = select( nuxStore );
		const associatedGuide = getAssociatedGuide( tipId );
		return {
			isVisible: isTipVisible( tipId ),
			hasNextTip: !! ( associatedGuide && associatedGuide.nextTipId ),
		};
	} ),
	withDispatch( ( dispatch, { tipId } ) => {
		const { dismissTip, disableTips } = dispatch( nuxStore );
		return {
			onDismiss() {
				dismissTip( tipId );
			},
			onDisable() {
				disableTips();
			},
		};
	} )
)( DotTip );
