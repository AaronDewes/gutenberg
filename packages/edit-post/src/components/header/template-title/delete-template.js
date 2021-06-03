/**
 * External dependencies
 */
import { pickBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@aarondewes/wp-i18n';
import { MenuGroup, MenuItem } from '@aarondewes/wp-components';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { store as editorStore } from '@aarondewes/wp-editor';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

export default function DeleteTemplate() {
	const { clearSelectedBlock } = useDispatch( blockEditorStore );
	const { setIsEditingTemplate } = useDispatch( editPostStore );
	const { getEditorSettings } = useSelect( editorStore );
	const { updateEditorSettings, editPost } = useDispatch( editorStore );
	const { deleteEntityRecord } = useDispatch( coreStore );
	const { template } = useSelect( ( select ) => {
		const { isEditingTemplate, getEditedPostTemplate } = select(
			editPostStore
		);
		const _isEditing = isEditingTemplate();
		return {
			template: _isEditing ? getEditedPostTemplate() : null,
		};
	}, [] );

	if ( ! template || ! template.wp_id ) {
		return null;
	}
	let templateTitle = template.slug;
	if ( template?.title ) {
		templateTitle = template.title;
	}

	return (
		<MenuGroup className="edit-post-template-top-area__second-menu-group">
			<MenuItem
				className="edit-post-template-top-area__delete-template-button"
				isDestructive
				variant="secondary"
				aria-label={ __( 'Delete template' ) }
				onClick={ () => {
					if (
						// eslint-disable-next-line no-alert
						window.confirm(
							/* translators: %1$s: template name */
							sprintf(
								'Are you sure you want to delete the %s template? It may be used by other pages or posts.',
								templateTitle
							)
						)
					) {
						clearSelectedBlock();
						setIsEditingTemplate( false );

						editPost( {
							template: '',
						} );
						const settings = getEditorSettings();
						const newAvailableTemplates = pickBy(
							settings.availableTemplates,
							( _title, id ) => {
								return id !== template.slug;
							}
						);
						updateEditorSettings( {
							...settings,
							availableTemplates: newAvailableTemplates,
						} );
						deleteEntityRecord(
							'postType',
							'wp_template',
							template.id
						);
					}
				} }
			>
				{ __( 'Delete template' ) }
			</MenuItem>
		</MenuGroup>
	);
}
