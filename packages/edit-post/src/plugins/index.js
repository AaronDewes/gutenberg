/**
 * WordPress dependencies
 */
import { MenuItem, VisuallyHidden } from '@aarondewes/wp-components';
import { external } from '@aarondewes/wp-icons';
import { __ } from '@aarondewes/wp-i18n';
import { registerPlugin } from '@aarondewes/wp-plugins';
import { addQueryArgs } from '@aarondewes/wp-url';

/**
 * Internal dependencies
 */
import CopyContentMenuItem from './copy-content-menu-item';
import ManageBlocksMenuItem from './manage-blocks-menu-item';
import KeyboardShortcutsHelpMenuItem from './keyboard-shortcuts-help-menu-item';
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';
import WelcomeGuideMenuItem from './welcome-guide-menu-item';

registerPlugin( 'edit-post', {
	render() {
		return (
			<>
				<ToolsMoreMenuGroup>
					{ ( { onClose } ) => (
						<>
							<ManageBlocksMenuItem onSelect={ onClose } />
							<MenuItem
								role="menuitem"
								href={ addQueryArgs( 'edit.php', {
									post_type: 'wp_block',
								} ) }
							>
								{ __( 'Manage Reusable blocks' ) }
							</MenuItem>
							<KeyboardShortcutsHelpMenuItem
								onSelect={ onClose }
							/>
							<WelcomeGuideMenuItem />
							<CopyContentMenuItem />
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
						</>
					) }
				</ToolsMoreMenuGroup>
			</>
		);
	},
} );
