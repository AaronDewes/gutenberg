/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@aarondewes/wp-compose';
import { DropdownMenu, MenuGroup, MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { check } from '@aarondewes/wp-icons';

export default function PreviewOptions( {
	children,
	className,
	isEnabled = true,
	deviceType,
	setDeviceType,
} ) {
	const isMobile = useViewportMatch( 'small', '<' );
	if ( isMobile ) return null;

	const popoverProps = {
		className: classnames(
			className,
			'block-editor-post-preview__dropdown-content'
		),
		position: 'bottom left',
	};
	const toggleProps = {
		variant: 'tertiary',
		className: 'block-editor-post-preview__button-toggle',
		disabled: ! isEnabled,
		/* translators: button label text should, if possible, be under 16 characters. */
		children: __( 'Preview' ),
	};
	return (
		<DropdownMenu
			className="block-editor-post-preview__dropdown"
			popoverProps={ popoverProps }
			toggleProps={ toggleProps }
			icon={ null }
		>
			{ () => (
				<>
					<MenuGroup>
						<MenuItem
							className="block-editor-post-preview__button-resize"
							onClick={ () => setDeviceType( 'Desktop' ) }
							icon={ deviceType === 'Desktop' && check }
						>
							{ __( 'Desktop' ) }
						</MenuItem>
						<MenuItem
							className="block-editor-post-preview__button-resize"
							onClick={ () => setDeviceType( 'Tablet' ) }
							icon={ deviceType === 'Tablet' && check }
						>
							{ __( 'Tablet' ) }
						</MenuItem>
						<MenuItem
							className="block-editor-post-preview__button-resize"
							onClick={ () => setDeviceType( 'Mobile' ) }
							icon={ deviceType === 'Mobile' && check }
						>
							{ __( 'Mobile' ) }
						</MenuItem>
					</MenuGroup>
					{ children }
				</>
			) }
		</DropdownMenu>
	);
}
