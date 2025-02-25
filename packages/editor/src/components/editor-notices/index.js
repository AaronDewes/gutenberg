/**
 * External dependencies
 */
import { filter } from 'lodash';

/**
 * WordPress dependencies
 */
import { NoticeList, SnackbarList } from '@aarondewes/wp-components';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';
import { store as noticesStore } from '@aarondewes/wp-notices';

/**
 * Internal dependencies
 */
import TemplateValidationNotice from '../template-validation-notice';

export function EditorNotices( { notices, onRemove } ) {
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
				className="components-editor-notices__pinned"
			/>
			<NoticeList
				notices={ dismissibleNotices }
				className="components-editor-notices__dismissible"
				onRemove={ onRemove }
			>
				<TemplateValidationNotice />
			</NoticeList>
			<SnackbarList
				notices={ snackbarNotices }
				className="components-editor-notices__snackbar"
				onRemove={ onRemove }
			/>
		</>
	);
}

export default compose( [
	withSelect( ( select ) => ( {
		notices: select( noticesStore ).getNotices(),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		onRemove: dispatch( noticesStore ).removeNotice,
	} ) ),
] )( EditorNotices );
