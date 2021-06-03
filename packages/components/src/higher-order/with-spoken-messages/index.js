/**
 * WordPress dependencies
 */
import { createHigherOrderComponent, useDebounce } from '@aarondewes/wp-compose';
import { speak } from '@aarondewes/wp-a11y';

/**
 * A Higher Order Component used to be provide speak and debounced speak
 * functions.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-a11y/#speak
 *
 * @param {WPComponent} Component The component to be wrapped.
 *
 * @return {WPComponent} The wrapped component.
 */
export default createHigherOrderComponent(
	( Component ) => ( props ) => (
		<Component
			{ ...props }
			speak={ speak }
			debouncedSpeak={ useDebounce( speak, 500 ) }
		/>
	),
	'withSpokenMessages'
);
