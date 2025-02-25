/**
 * External dependencies
 */
import { filter } from 'lodash';

/**
 * WordPress dependencies
 */
import { NoticeList, SnackbarList } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { store as noticesStore } from '@aarondewes/wp-notices';

export default function EditNavigationNotices() {
	const { removeNotice } = useDispatch( noticesStore );
	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);
	const dismissibleNotices = filter( notices, {
		isDismissible: true,
		type: 'default',
	} );
	const nonDismissibleNotices = filter( notices, {
		isDismissible: false,
		type: 'default',
	} );
	const snackbarNotices = filter( notices, {
		type: 'snackbar',
	} );

	return (
		<>
			<NoticeList
				notices={ nonDismissibleNotices }
				className="edit-navigation-notices__notice-list"
			/>
			<NoticeList
				notices={ dismissibleNotices }
				className="edit-navigation-notices__notice-list"
				onRemove={ removeNotice }
			/>
			<SnackbarList
				notices={ snackbarNotices }
				className="edit-navigation-notices__snackbar-list"
				onRemove={ removeNotice }
			/>
		</>
	);
}
