/**
 * WordPress dependencies
 */
import {
	ToolbarDropdownMenu,
	MenuGroup,
	MenuItem,
	VisuallyHidden,
} from '@aarondewes/wp-components';
import { useState } from '@aarondewes/wp-element';
import { __, _x } from '@aarondewes/wp-i18n';
import { external, moreVertical } from '@aarondewes/wp-icons';
import { displayShortcut } from '@aarondewes/wp-keycodes';
import { useShortcut } from '@aarondewes/wp-keyboard-shortcuts';

/**
 * Internal dependencies
 */
import FeatureToggle from './feature-toggle';
import KeyboardShortcutHelpModal from '../keyboard-shortcut-help-modal';

const POPOVER_PROPS = {
	className: 'customize-widgets-more-menu__content',
	position: 'bottom left',
};
const TOGGLE_PROPS = {
	tooltipPosition: 'bottom',
};

export default function MoreMenu() {
	const [
		isKeyboardShortcutsModalActive,
		setIsKeyboardShortcutsModalVisible,
	] = useState( false );
	const toggleKeyboardShortcutsModal = () =>
		setIsKeyboardShortcutsModalVisible( ! isKeyboardShortcutsModalActive );

	useShortcut(
		'core/customize-widgets/keyboard-shortcuts',
		toggleKeyboardShortcutsModal,
		{
			bindGlobal: true,
		}
	);

	return (
		<>
			<ToolbarDropdownMenu
				className="customize-widgets-more-menu"
				icon={ moreVertical }
				/* translators: button label text should, if possible, be under 16 characters. */
				label={ __( 'Options' ) }
				popoverProps={ POPOVER_PROPS }
				toggleProps={ TOGGLE_PROPS }
			>
				{ () => (
					<>
						<MenuGroup label={ _x( 'View', 'noun' ) }>
							<FeatureToggle
								feature="fixedToolbar"
								label={ __( 'Top toolbar' ) }
								info={ __(
									'Access all block and document tools in a single place'
								) }
								messageActivated={ __(
									'Top toolbar activated'
								) }
								messageDeactivated={ __(
									'Top toolbar deactivated'
								) }
							/>
						</MenuGroup>
						<MenuGroup label={ __( 'Tools' ) }>
							<MenuItem
								onClick={ () => {
									setIsKeyboardShortcutsModalVisible( true );
								} }
								shortcut={ displayShortcut.access( 'h' ) }
							>
								{ __( 'Keyboard shortcuts' ) }
							</MenuItem>
							<FeatureToggle
								feature="welcomeGuide"
								label={ __( 'Welcome Guide' ) }
							/>
							<MenuItem
								role="menuitem"
								icon={ external }
								href={ __(
									'https://wordpress.org/support/article/wordpress-editor/'
								) }
								target="_blank"
								rel="noopener noreferrer"
							>
								{ __( 'Help' ) }
								<VisuallyHidden as="span">
									{
										/* translators: accessibility text */
										__( '(opens in a new tab)' )
									}
								</VisuallyHidden>
							</MenuItem>
						</MenuGroup>
						<MenuGroup label={ __( 'Preferences' ) }>
							<FeatureToggle
								feature="keepCaretInsideBlock"
								label={ __(
									'Contain text cursor inside block'
								) }
								info={ __(
									'Aids screen readers by stopping text caret from leaving blocks.'
								) }
								messageActivated={ __(
									'Contain text cursor inside block activated'
								) }
								messageDeactivated={ __(
									'Contain text cursor inside block deactivated'
								) }
							/>
						</MenuGroup>
					</>
				) }
			</ToolbarDropdownMenu>
			<KeyboardShortcutHelpModal
				isModalActive={ isKeyboardShortcutsModalActive }
				toggleModal={ toggleKeyboardShortcutsModal }
			/>
		</>
	);
}
