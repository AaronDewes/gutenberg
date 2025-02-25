/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Dropdown, Button } from '@aarondewes/wp-components';
import { useSelect } from '@aarondewes/wp-data';
import { info } from '@aarondewes/wp-icons';
import { forwardRef } from '@aarondewes/wp-element';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';

/**
 * Internal dependencies
 */
import TableOfContentsPanel from './panel';

function TableOfContents(
	{ hasOutlineItemsDisabled, repositionDropdown, ...props },
	ref
) {
	const hasBlocks = useSelect(
		( select ) => !! select( blockEditorStore ).getBlockCount(),
		[]
	);
	return (
		<Dropdown
			position={ repositionDropdown ? 'middle right right' : 'bottom' }
			className="table-of-contents"
			contentClassName="table-of-contents__popover"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					{ ...props }
					ref={ ref }
					onClick={ hasBlocks ? onToggle : undefined }
					icon={ info }
					aria-expanded={ isOpen }
					aria-haspopup="true"
					/* translators: button label text should, if possible, be under 16 characters. */
					label={ __( 'Details' ) }
					tooltipPosition="bottom"
					aria-disabled={ ! hasBlocks }
				/>
			) }
			renderContent={ ( { onClose } ) => (
				<TableOfContentsPanel
					onRequestClose={ onClose }
					hasOutlineItemsDisabled={ hasOutlineItemsDisabled }
				/>
			) }
		/>
	);
}

export default forwardRef( TableOfContents );
