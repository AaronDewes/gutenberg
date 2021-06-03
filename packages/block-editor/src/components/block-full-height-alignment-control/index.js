/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { ToolbarButton } from '@aarondewes/wp-components';
import { fullscreen } from '@aarondewes/wp-icons';

function BlockFullHeightAlignmentControl( {
	isActive,
	label = __( 'Toggle full height' ),
	onToggle,
	isDisabled,
} ) {
	return (
		<ToolbarButton
			isActive={ isActive }
			icon={ fullscreen }
			label={ label }
			onClick={ () => onToggle( ! isActive ) }
			disabled={ isDisabled }
		/>
	);
}

export default BlockFullHeightAlignmentControl;
