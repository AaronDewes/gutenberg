/**
 * WordPress dependencies
 */
import { ToolbarButton, DuotoneSwatch } from '@aarondewes/wp-components';
import { useState } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { DOWN } from '@aarondewes/wp-keycodes';

/**
 * Internal dependencies
 */
import DuotonePickerPopover from './duotone-picker-popover';

function DuotoneControl( {
	colorPalette,
	duotonePalette,
	disableCustomColors,
	value,
	onChange,
} ) {
	const [ isOpen, setIsOpen ] = useState( false );

	if ( ! duotonePalette ) {
		return null;
	}

	const onToggle = () => {
		setIsOpen( ( prev ) => ! prev );
	};

	const openOnArrowDown = ( event ) => {
		if ( ! isOpen && event.keyCode === DOWN ) {
			event.preventDefault();
			event.stopPropagation();
			onToggle();
		}
	};

	return (
		<>
			<ToolbarButton
				showTooltip
				onClick={ onToggle }
				aria-haspopup="true"
				aria-expanded={ isOpen }
				onKeyDown={ openOnArrowDown }
				label={ __( 'Apply duotone filter' ) }
				icon={ <DuotoneSwatch values={ value } /> }
			/>
			{ isOpen && (
				<DuotonePickerPopover
					value={ value }
					onChange={ onChange }
					onToggle={ onToggle }
					duotonePalette={ duotonePalette }
					colorPalette={ colorPalette }
					disableCustomColors={ disableCustomColors }
				/>
			) }
		</>
	);
}

export default DuotoneControl;
