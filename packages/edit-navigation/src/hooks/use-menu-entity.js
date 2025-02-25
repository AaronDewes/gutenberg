/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';
/**
 * Internal dependencies
 */
import { MENU_KIND, MENU_POST_TYPE } from '../constants';

export default function useMenuEntity( menuId ) {
	const { editEntityRecord } = useDispatch( coreStore );

	const menuEntityData = [ MENU_KIND, MENU_POST_TYPE, menuId ];
	const { editedMenu, hasLoadedEditedMenu } = useSelect(
		( select ) => {
			return {
				editedMenu:
					menuId &&
					select( coreStore ).getEditedEntityRecord(
						...menuEntityData
					),
				hasLoadedEditedMenu: select(
					coreStore
				).hasFinishedResolution( 'getEditedEntityRecord', [
					...menuEntityData,
				] ),
			};
		},
		[ menuId ]
	);

	return {
		editedMenu,
		menuEntityData,
		editMenuEntityRecord: editEntityRecord,
		hasLoadedEditedMenu,
	};
}
