/**
 * External dependencies
 */
import { filter, map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { withSelect } from '@aarondewes/wp-data';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import Section from './section';
import { EnableCustomFieldsOption, EnablePanelOption } from './options';
import { store as editPostStore } from '../../store';

export function MetaBoxesSection( {
	areCustomFieldsRegistered,
	metaBoxes,
	...sectionProps
} ) {
	// The 'Custom Fields' meta box is a special case that we handle separately.
	const thirdPartyMetaBoxes = filter(
		metaBoxes,
		( { id } ) => id !== 'postcustom'
	);

	if ( ! areCustomFieldsRegistered && thirdPartyMetaBoxes.length === 0 ) {
		return null;
	}

	return (
		<Section { ...sectionProps }>
			{ areCustomFieldsRegistered && (
				<EnableCustomFieldsOption label={ __( 'Custom fields' ) } />
			) }
			{ map( thirdPartyMetaBoxes, ( { id, title } ) => (
				<EnablePanelOption
					key={ id }
					label={ title }
					panelName={ `meta-box-${ id }` }
				/>
			) ) }
		</Section>
	);
}

export default withSelect( ( select ) => {
	const { getEditorSettings } = select( editorStore );
	const { getAllMetaBoxes } = select( editPostStore );

	return {
		// This setting should not live in the block editor's store.
		areCustomFieldsRegistered:
			getEditorSettings().enableCustomFields !== undefined,
		metaBoxes: getAllMetaBoxes(),
	};
} )( MetaBoxesSection );
