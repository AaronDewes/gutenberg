/**
 * WordPress dependencies
 */
import { useContext } from '@aarondewes/wp-element';
import {
	__experimentalToolbarContext as ToolbarContext,
	ToolbarGroup,
	__experimentalUseSlot as useSlot,
} from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import groups from './groups';

export default function BlockControlsSlot( { group = 'default', ...props } ) {
	const accessibleToolbarState = useContext( ToolbarContext );
	const Slot = groups[ group ].Slot;
	const slot = useSlot( Slot.__unstableName );
	const hasFills = Boolean( slot.fills && slot.fills.length );

	if ( ! hasFills ) {
		return null;
	}

	if ( group === 'default' ) {
		return (
			<Slot
				{ ...props }
				bubblesVirtually
				fillProps={ accessibleToolbarState }
			/>
		);
	}

	return (
		<ToolbarGroup>
			<Slot
				{ ...props }
				bubblesVirtually
				fillProps={ accessibleToolbarState }
			/>
		</ToolbarGroup>
	);
}
