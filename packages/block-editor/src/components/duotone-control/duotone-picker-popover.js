/**
 * WordPress dependencies
 */
import { Popover, MenuGroup, DuotonePicker } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

function DuotonePickerPopover( {
	value,
	onChange,
	onToggle,
	duotonePalette,
	colorPalette,
	disableCustomColors,
} ) {
	return (
		<Popover
			className="block-editor-duotone-control__popover"
			headerTitle={ __( 'Duotone' ) }
			onFocusOutside={ onToggle }
		>
			<MenuGroup label={ __( 'Duotone' ) }>
				<DuotonePicker
					colorPalette={ colorPalette }
					duotonePalette={ duotonePalette }
					disableCustomColors={ disableCustomColors }
					value={ value }
					onChange={ onChange }
				/>
			</MenuGroup>
		</Popover>
	);
}

export default DuotonePickerPopover;
