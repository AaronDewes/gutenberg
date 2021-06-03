/**
 * WordPress dependencies
 */
import { useContext } from '@aarondewes/wp-element';
import { Disabled } from '@aarondewes/wp-components';
import deprecated from '@aarondewes/wp-deprecated';

/**
 * Internal dependencies
 */
import InsertionPoint, { InsertionPointOpenRef } from './insertion-point';
import BlockPopover from './block-popover';

export default function BlockToolsBackCompat( { children } ) {
	const openRef = useContext( InsertionPointOpenRef );
	const isDisabled = useContext( Disabled.Context );

	// If context is set, `BlockTools` is a parent component.
	if ( openRef || isDisabled ) {
		return children;
	}

	deprecated( 'wp.components.Popover.Slot name="block-toolbar"', {
		alternative: 'wp.blockEditor.BlockTools',
	} );

	return (
		<InsertionPoint __unstablePopoverSlot="block-toolbar">
			<BlockPopover __unstablePopoverSlot="block-toolbar" />
			{ children }
		</InsertionPoint>
	);
}
