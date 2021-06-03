/**
 * WordPress dependencies
 */
import deprecated from '@aarondewes/wp-deprecated';
import { forwardRef } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import Button from '../button';

function IconButton( { labelPosition, size, tooltip, label, ...props }, ref ) {
	deprecated( 'wp.components.IconButton', {
		since: '5.4',
		alternative: 'wp.components.Button',
	} );

	return (
		<Button
			{ ...props }
			ref={ ref }
			tooltipPosition={ labelPosition }
			iconSize={ size }
			showTooltip={ tooltip !== undefined ? !! tooltip : undefined }
			label={ tooltip || label }
		/>
	);
}

export default forwardRef( IconButton );
