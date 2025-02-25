/**
 * WordPress dependencies
 */
import { forwardRef } from '@aarondewes/wp-element';
import deprecated from '@aarondewes/wp-deprecated';

function stopPropagation( event ) {
	event.stopPropagation();
}

export default forwardRef( ( { children, ...props }, ref ) => {
	deprecated( 'wp.components.IsolatedEventContainer', {
		since: '5.7',
	} );

	// Disable reason: this stops certain events from propagating outside of the component.
	//   - onMouseDown is disabled as this can cause interactions with other DOM elements
	/* eslint-disable jsx-a11y/no-static-element-interactions */
	return (
		<div { ...props } ref={ ref } onMouseDown={ stopPropagation }>
			{ children }
		</div>
	);
	/* eslint-enable jsx-a11y/no-static-element-interactions */
} );
