/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { keyboardReturn } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import URLInput from '../url-input';

export default function LinkEditor( {
	autocompleteRef,
	className,
	onChangeInputValue,
	value,
	...props
} ) {
	return (
		<form
			className={ classnames(
				'block-editor-url-popover__link-editor',
				className
			) }
			{ ...props }
		>
			<URLInput
				value={ value }
				onChange={ onChangeInputValue }
				autocompleteRef={ autocompleteRef }
			/>
			<Button
				icon={ keyboardReturn }
				label={ __( 'Apply' ) }
				type="submit"
			/>
		</form>
	);
}
