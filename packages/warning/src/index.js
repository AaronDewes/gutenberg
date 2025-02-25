function isDev() {
	return (
		typeof process !== 'undefined' &&
		process.env &&
		process.env.NODE_ENV !== 'production'
	);
}

/**
 * Shows a warning with `message` if environment is not `production`.
 *
 * @param {string} message Message to show in the warning.
 *
 * @example
 * ```js
 * import warning from '@aarondewes/wp-warning';
 *
 * function MyComponent( props ) {
 *   if ( ! props.title ) {
 *     warning( '`props.title` was not passed' );
 *   }
 *   ...
 * }
 * ```
 */
export default function warning( message ) {
	if ( ! isDev() ) {
		return;
	}

	// eslint-disable-next-line no-console
	console.warn( message );

	// Throwing an error and catching it immediately to improve debugging
	// A consumer can use 'pause on caught exceptions'
	// https://github.com/facebook/react/issues/4216
	try {
		throw Error( message );
	} catch ( x ) {
		// do nothing
	}
}
