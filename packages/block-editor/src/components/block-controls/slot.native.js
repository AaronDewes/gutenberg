/**
 * WordPress dependencies
 */
import { useContext } from '@aarondewes/wp-element';
import {
	__experimentalToolbarContext as ToolbarContext,
	ToolbarGroup,
} from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import groups from './groups';

export default function BlockControlsSlot( { group = 'default', ...props } ) {
	const accessibleToolbarState = useContext( ToolbarContext );
	const Slot = groups[ group ].Slot;

	if ( group === 'default' ) {
		return <Slot { ...props } fillProps={ accessibleToolbarState } />;
	}

	return (
		<Slot { ...props } fillProps={ accessibleToolbarState }>
			{ ( fills ) => {
				if ( ! fills.length ) {
					return null;
				}
				return <ToolbarGroup>{ fills }</ToolbarGroup>;
			} }
		</Slot>
	);
}
