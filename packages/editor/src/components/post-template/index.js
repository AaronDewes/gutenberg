/**
 * External dependencies
 */
import { isEmpty, map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { SelectControl } from '@aarondewes/wp-components';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export function PostTemplate( {} ) {
	const { availableTemplates, selectedTemplate, isViewable } = useSelect(
		( select ) => {
			const {
				getEditedPostAttribute,
				getEditorSettings,
				getCurrentPostType,
			} = select( editorStore );
			const { getPostType } = select( coreStore );

			return {
				selectedTemplate: getEditedPostAttribute( 'template' ),
				availableTemplates: getEditorSettings().availableTemplates,
				isViewable:
					getPostType( getCurrentPostType() )?.viewable ?? false,
			};
		},
		[]
	);

	const { editPost } = useDispatch( editorStore );

	if ( ! isViewable || isEmpty( availableTemplates ) ) {
		return null;
	}

	return (
		<SelectControl
			label={ __( 'Template:' ) }
			value={ selectedTemplate }
			onChange={ ( templateSlug ) => {
				editPost( {
					template: templateSlug || '',
				} );
			} }
			options={ map(
				availableTemplates,
				( templateName, templateSlug ) => ( {
					value: templateSlug,
					label: templateName,
				} )
			) }
		/>
	);
}

export default PostTemplate;
