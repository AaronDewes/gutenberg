/**
 * WordPress dependencies
 */
import { createSlotFill, ToolbarButton } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { withDispatch } from '@aarondewes/wp-data';
import { cog } from '@aarondewes/wp-icons';

const { Fill, Slot } = createSlotFill( 'SettingsToolbarButton' );

const SettingsButton = ( { openGeneralSidebar } ) => (
	<ToolbarButton
		title={ __( 'Open Settings' ) }
		icon={ cog }
		onClick={ openGeneralSidebar }
	/>
);

const SettingsButtonFill = ( props ) => (
	<Fill>
		<SettingsButton { ...props } />
	</Fill>
);

const SettingsToolbarButton = withDispatch( ( dispatch ) => {
	const { openGeneralSidebar } = dispatch( 'core/edit-post' );

	return {
		openGeneralSidebar: () => openGeneralSidebar( 'edit-post/block' ),
	};
} )( SettingsButtonFill );

SettingsToolbarButton.Slot = Slot;

export default SettingsToolbarButton;
