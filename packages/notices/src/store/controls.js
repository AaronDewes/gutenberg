/**
 * WordPress dependencies
 */
import { speak } from '@aarondewes/wp-a11y';

export default {
	SPEAK( action ) {
		speak( action.message, action.ariaLive || 'assertive' );
	},
};
