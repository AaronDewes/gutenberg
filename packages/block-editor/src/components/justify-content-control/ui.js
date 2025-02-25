/**
 * WordPress dependencies
 */
import { ToolbarDropdownMenu, ToolbarGroup } from '@aarondewes/wp-components';
import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween,
} from '@aarondewes/wp-icons';
import { __ } from '@aarondewes/wp-i18n';

const icons = {
	left: justifyLeft,
	center: justifyCenter,
	right: justifyRight,
	'space-between': justifySpaceBetween,
};

function JustifyContentUI( {
	allowedControls = [ 'left', 'center', 'right', 'space-between' ],
	isCollapsed = true,
	onChange,
	value,
	popoverProps,
	isToolbar,
} ) {
	// If the control is already selected we want a click
	// again on the control to deselect the item, so we
	// call onChange( undefined )
	const handleClick = ( next ) => {
		if ( next === value ) {
			onChange( undefined );
		} else {
			onChange( next );
		}
	};

	const icon = value ? icons[ value ] : icons.left;
	const allControls = [
		{
			name: 'left',
			icon: justifyLeft,
			title: __( 'Justify items left' ),
			isActive: 'left' === value,
			onClick: () => handleClick( 'left' ),
		},
		{
			name: 'center',
			icon: justifyCenter,
			title: __( 'Justify items center' ),
			isActive: 'center' === value,
			onClick: () => handleClick( 'center' ),
		},
		{
			name: 'right',
			icon: justifyRight,
			title: __( 'Justify items right' ),
			isActive: 'right' === value,
			onClick: () => handleClick( 'right' ),
		},
		{
			name: 'space-between',
			icon: justifySpaceBetween,
			title: __( 'Space between items' ),
			isActive: 'space-between' === value,
			onClick: () => handleClick( 'space-between' ),
		},
	];

	const UIComponent = isToolbar ? ToolbarGroup : ToolbarDropdownMenu;
	const extraProps = isToolbar ? { isCollapsed } : {};

	return (
		<UIComponent
			icon={ icon }
			popoverProps={ popoverProps }
			label={ __( 'Change items justification' ) }
			controls={ allControls.filter( ( elem ) =>
				allowedControls.includes( elem.name )
			) }
			{ ...extraProps }
		/>
	);
}

export default JustifyContentUI;
