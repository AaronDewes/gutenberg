/**
 * WordPress dependencies
 */
import { useContext } from '@aarondewes/wp-element';
import { ToolbarGroup, ToolbarButton } from '@aarondewes/wp-components';
import { BlockControls } from '@aarondewes/wp-block-editor';
import { useDispatch } from '@aarondewes/wp-data';
import { store as interfaceStore } from '@aarondewes/wp-interface';
import { sprintf, __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import {
	untitledMenu,
	useSelectedMenuId,
	useMenuEntityProp,
	IsMenuNameControlFocusedContext,
} from '../../hooks';
import { SIDEBAR_SCOPE, SIDEBAR_MENU } from '../../constants';

export default function NameDisplay() {
	const { enableComplementaryArea } = useDispatch( interfaceStore );
	const [ menuId ] = useSelectedMenuId();
	const [ name ] = useMenuEntityProp( 'name', menuId );
	const [ , setIsMenuNameEditFocused ] = useContext(
		IsMenuNameControlFocusedContext
	);

	const menuName = name ?? untitledMenu;

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					aria-label={ sprintf(
						// translators: %s: the name of a menu.
						__( `Edit menu name: %s` ),
						menuName
					) }
					onClick={ () => {
						enableComplementaryArea( SIDEBAR_SCOPE, SIDEBAR_MENU );
						setIsMenuNameEditFocused( true );
					} }
				>
					{ menuName }
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}
