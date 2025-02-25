/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { useEffect } from '@aarondewes/wp-element';
import { store as noticesStore } from '@aarondewes/wp-notices';
import { store as coreStore } from '@aarondewes/wp-core-data';
/**
 * Internal dependencies
 */
import { MENU_POST_TYPE, MENU_KIND } from '../constants';

export default function useMenuNotifications( menuId ) {
	const { lastSaveError, lastDeleteError } = useSelect(
		( select ) => ( {
			lastSaveError: select( coreStore ).getLastEntitySaveError(
				MENU_KIND,
				MENU_POST_TYPE
			),
			lastDeleteError: select( coreStore ).getLastEntityDeleteError(
				MENU_KIND,
				MENU_POST_TYPE,
				menuId
			),
		} ),
		[ menuId ]
	);

	const { createErrorNotice } = useDispatch( noticesStore );

	const processError = ( error ) => {
		const document = new window.DOMParser().parseFromString(
			error.message,
			'text/html'
		);
		const errorText = document.body.textContent || '';
		createErrorNotice( errorText, { id: 'edit-navigation-error' } );
	};

	useEffect( () => {
		if ( lastSaveError ) {
			processError( lastSaveError );
		}
	}, [ lastSaveError ] );

	useEffect( () => {
		if ( lastDeleteError ) {
			processError( lastDeleteError );
		}
	}, [ lastDeleteError ] );
}
