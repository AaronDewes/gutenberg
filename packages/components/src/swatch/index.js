/**
 * WordPress dependencies
 */
import { swatch } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import Icon from '../icon';

function Swatch( { fill } ) {
	return fill ? (
		<span className="components-swatch" style={ { background: fill } } />
	) : (
		<Icon icon={ swatch } />
	);
}

export default Swatch;
