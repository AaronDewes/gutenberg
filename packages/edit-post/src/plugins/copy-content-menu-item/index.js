/**
 * WordPress dependencies
 */
import { MenuItem } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { useCopyToClipboard } from '@aarondewes/wp-compose';
import { store as noticesStore } from '@aarondewes/wp-notices';
import { store as editorStore } from '@aarondewes/wp-editor';

export default function CopyContentMenuItem() {
	const { createNotice } = useDispatch( noticesStore );
	const getText = useSelect(
		( select ) => () =>
			select( editorStore ).getEditedPostAttribute( 'content' ),
		[]
	);

	function onSuccess() {
		createNotice( 'info', __( 'All content copied.' ), {
			isDismissible: true,
			type: 'snackbar',
		} );
	}

	const ref = useCopyToClipboard( getText, onSuccess );

	return <MenuItem ref={ ref }>{ __( 'Copy all content' ) }</MenuItem>;
}
