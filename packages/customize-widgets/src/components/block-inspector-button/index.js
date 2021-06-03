/**
 * WordPress dependencies
 */
import { useMemo } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { MenuItem } from '@aarondewes/wp-components';
import { useSelect } from '@aarondewes/wp-data';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';

function BlockInspectorButton( { inspector, closeMenu, ...props } ) {
	const selectedBlockClientId = useSelect(
		( select ) => select( blockEditorStore ).getSelectedBlockClientId(),
		[]
	);

	const selectedBlock = useMemo(
		() => document.getElementById( `block-${ selectedBlockClientId }` ),
		[ selectedBlockClientId ]
	);

	return (
		<MenuItem
			onClick={ () => {
				// Open the inspector.
				inspector.open( {
					returnFocusWhenClose: selectedBlock,
				} );
				// Then close the dropdown menu.
				closeMenu();
			} }
			{ ...props }
		>
			{ __( 'Show more settings' ) }
		</MenuItem>
	);
}

export default BlockInspectorButton;
