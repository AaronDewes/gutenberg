/**
 * WordPress dependencies
 */
import deprecated from '@aarondewes/wp-deprecated';

export default ( registry ) => {
	deprecated( 'wp.data.plugins.controls', {
		since: '5.4',
		hint: 'The controls plugins is now baked-in.',
	} );
	return registry;
};
