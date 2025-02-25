/**
 * WordPress dependencies
 */
import { __, sprintf } from '@aarondewes/wp-i18n';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { useState, useEffect } from '@aarondewes/wp-element';
import { store as noticesStore } from '@aarondewes/wp-notices';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../store';
import { useSelectedMenuId } from './index';
import useMenuEntity from './use-menu-entity';

const getMenusData = ( select ) => {
	const selectors = select( 'core' );
	const params = { per_page: -1 };
	return {
		menus: selectors.getMenus( params ),
		hasLoadedMenus: selectors.hasFinishedResolution( 'getMenus', [
			params,
		] ),
	};
};
export default function useNavigationEditor() {
	const { deleteMenu: _deleteMenu } = useDispatch( coreStore );
	const [ selectedMenuId, setSelectedMenuId ] = useSelectedMenuId();
	const [ hasFinishedInitialLoad, setHasFinishedInitialLoad ] = useState(
		false
	);
	const { editedMenu, hasLoadedEditedMenu } = useMenuEntity( selectedMenuId );
	const { menus, hasLoadedMenus } = useSelect( getMenusData, [] );

	/**
	 * If the Menu being edited has been requested from API and it has
	 * no values then it has been deleted so reset the selected menu ID.
	 */
	useEffect( () => {
		if ( hasLoadedEditedMenu && ! Object.keys( editedMenu )?.length ) {
			setSelectedMenuId( null );
		}
	}, [ hasLoadedEditedMenu, editedMenu ] );

	const { createErrorNotice, createInfoNotice } = useDispatch( noticesStore );
	const isMenuBeingDeleted = useSelect(
		( select ) =>
			select( coreStore ).isDeletingEntityRecord(
				'root',
				'menu',
				selectedMenuId
			),
		[ selectedMenuId ]
	);
	const selectedMenuName =
		menus?.find( ( { id } ) => id === selectedMenuId )?.name || '';

	useEffect( () => {
		if ( hasLoadedMenus ) {
			setHasFinishedInitialLoad( true );
		}
	}, [ hasLoadedMenus ] );

	const navigationPost = useSelect(
		( select ) => {
			if ( ! selectedMenuId ) {
				return;
			}
			return select( editNavigationStore ).getNavigationPostForMenu(
				selectedMenuId
			);
		},
		[ selectedMenuId ]
	);

	const deleteMenu = async () => {
		const didDeleteMenu = await _deleteMenu( selectedMenuId, {
			force: true,
		} );
		if ( didDeleteMenu ) {
			setSelectedMenuId( null );
			createInfoNotice(
				sprintf(
					// translators: %s: the name of a menu.
					__( '"%s" menu has been deleted' ),
					selectedMenuName
				),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		} else {
			createErrorNotice( __( 'Menu deletion unsuccessful' ) );
		}
	};

	return {
		menus,
		hasLoadedMenus,
		hasFinishedInitialLoad,
		selectedMenuId,
		navigationPost,
		isMenuBeingDeleted,
		selectMenu: setSelectedMenuId,
		deleteMenu,
		isMenuSelected: !! selectedMenuId,
	};
}
