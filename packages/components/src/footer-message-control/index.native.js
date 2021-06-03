/**
 * WordPress dependencies
 */
import { memo } from '@aarondewes/wp-element';
/**
 * Internal dependencies
 */
import FooterMessageCell from '../mobile/bottom-sheet/footer-message-cell';

function FooterMessageControl( { ...props } ) {
	return <FooterMessageCell { ...props } />;
}

export default memo( FooterMessageControl );
