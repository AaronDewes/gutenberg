/**
 * WordPress dependencies
 */
import { ComplementaryArea } from '@aarondewes/wp-interface';
import { useSelect } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { store as keyboardShortcutsStore } from '@aarondewes/wp-keyboard-shortcuts';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

/**
 * Renders a sidebar when activated. The contents within the `PluginSidebar` will appear as content within the sidebar.
 * It also automatically renders a corresponding `PluginSidebarMenuItem` component when `isPinnable` flag is set to `true`.
 * If you wish to display the sidebar, you can with use the `PluginSidebarMoreMenuItem` component or the `wp.data.dispatch` API:
 *
 * ```js
 * wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'plugin-name/sidebar-name' );
 * ```
 *
 * @see PluginSidebarMoreMenuItem
 *
 * @param {Object} props Element props.
 * @param {string} props.name A string identifying the sidebar. Must be unique for every sidebar registered within the scope of your plugin.
 * @param {string} [props.className] An optional class name added to the sidebar body.
 * @param {string} props.title Title displayed at the top of the sidebar.
 * @param {boolean} [props.isPinnable=true] Whether to allow to pin sidebar to the toolbar. When set to `true` it also automatically renders a corresponding menu item.
 * @param {WPBlockTypeIconRender} [props.icon=inherits from the plugin] The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.
 *
 * @example
 * ```js
 * // Using ES5 syntax
 * var __ = wp.i18n.__;
 * var el = wp.element.createElement;
 * var PanelBody = wp.components.PanelBody;
 * var PluginSidebar = wp.editPost.PluginSidebar;
 * var moreIcon = wp.element.createElement( 'svg' ); //... svg element.
 *
 * function MyPluginSidebar() {
 * 	return el(
 * 			PluginSidebar,
 * 			{
 * 				name: 'my-sidebar',
 * 				title: 'My sidebar title',
 * 				icon: moreIcon,
 * 			},
 * 			el(
 * 				PanelBody,
 * 				{},
 * 				__( 'My sidebar content' )
 * 			)
 * 	);
 * }
 * ```
 *
 * @example
 * ```jsx
 * // Using ESNext syntax
 * import { __ } from '@aarondewes/wp-i18n';
 * import { PanelBody } from '@aarondewes/wp-components';
 * import { PluginSidebar } from '@aarondewes/wp-edit-post';
 * import { more } from '@aarondewes/wp-icons';
 *
 * const MyPluginSidebar = () => (
 * 	<PluginSidebar
 * 		name="my-sidebar"
 * 		title="My sidebar title"
 * 		icon={ more }
 * 	>
 * 		<PanelBody>
 * 			{ __( 'My sidebar content' ) }
 * 		</PanelBody>
 * 	</PluginSidebar>
 * );
 * ```
 */
export default function PluginSidebarEditPost( { className, ...props } ) {
	const { postTitle, shortcut, showIconLabels } = useSelect( ( select ) => {
		return {
			postTitle: select( editorStore ).getEditedPostAttribute( 'title' ),
			shortcut: select(
				keyboardShortcutsStore
			).getShortcutRepresentation( 'core/edit-post/toggle-sidebar' ),
			showIconLabels: select( editPostStore ).isFeatureActive(
				'showIconLabels'
			),
		};
	} );
	return (
		<ComplementaryArea
			panelClassName={ className }
			className="edit-post-sidebar"
			smallScreenTitle={ postTitle || __( '(no title)' ) }
			scope="core/edit-post"
			toggleShortcut={ shortcut }
			showIconLabels={ showIconLabels }
			{ ...props }
		/>
	);
}
