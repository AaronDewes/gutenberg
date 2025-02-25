/**
 * WordPress dependencies
 */
import {
	Dropdown,
	Button,
	MenuItemsChoice,
	SVG,
	Path,
	NavigableMenu,
} from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { forwardRef } from '@aarondewes/wp-element';
import { Icon, edit as editIcon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

const selectIcon = (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<Path d="M9.4 20.5L5.2 3.8l14.6 9-2 .3c-.2 0-.4.1-.7.1-.9.2-1.6.3-2.2.5-.8.3-1.4.5-1.8.8-.4.3-.8.8-1.3 1.5-.4.5-.8 1.2-1.2 2l-.3.6-.9 1.9zM7.6 7.1l2.4 9.3c.2-.4.5-.8.7-1.1.6-.8 1.1-1.4 1.6-1.8.5-.4 1.3-.8 2.2-1.1l1.2-.3-8.1-5z" />
	</SVG>
);

function ToolSelector( props, ref ) {
	const isNavigationTool = useSelect(
		( select ) => select( blockEditorStore ).isNavigationMode(),
		[]
	);
	const { setNavigationMode } = useDispatch( blockEditorStore );

	const onSwitchMode = ( mode ) => {
		setNavigationMode( mode === 'edit' ? false : true );
	};

	return (
		<Dropdown
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					{ ...props }
					ref={ ref }
					icon={ isNavigationTool ? selectIcon : editIcon }
					aria-expanded={ isOpen }
					aria-haspopup="true"
					onClick={ onToggle }
					/* translators: button label text should, if possible, be under 16 characters. */
					label={ __( 'Tools' ) }
				/>
			) }
			position="bottom right"
			renderContent={ () => (
				<>
					<NavigableMenu role="menu" aria-label={ __( 'Tools' ) }>
						<MenuItemsChoice
							value={ isNavigationTool ? 'select' : 'edit' }
							onSelect={ onSwitchMode }
							choices={ [
								{
									value: 'edit',
									label: (
										<>
											<Icon icon={ editIcon } />
											{ __( 'Edit' ) }
										</>
									),
								},
								{
									value: 'select',
									label: (
										<>
											{ selectIcon }
											{ __( 'Select' ) }
										</>
									),
								},
							] }
						/>
					</NavigableMenu>
					<div className="block-editor-tool-selector__help">
						{ __(
							'Tools provide different interactions for selecting, navigating, and editing blocks. Toggle between select and edit by pressing Escape and Enter.'
						) }
					</div>
				</>
			) }
		/>
	);
}

export default forwardRef( ToolSelector );
