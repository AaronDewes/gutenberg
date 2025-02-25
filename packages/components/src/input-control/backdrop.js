/**
 * WordPress dependencies
 */
import { memo } from '@aarondewes/wp-element';
/**
 * Internal dependencies
 */
import { BackdropUI } from './styles/input-control-styles';

function Backdrop( { disabled = false, isFocused = false } ) {
	return (
		<BackdropUI
			aria-hidden="true"
			className="components-input-control__backdrop"
			disabled={ disabled }
			isFocused={ isFocused }
		/>
	);
}

const MemoizedBackdrop = memo( Backdrop );

export default MemoizedBackdrop;
