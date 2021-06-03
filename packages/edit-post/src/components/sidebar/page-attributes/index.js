/**
 * External dependencies
 */
import { get, partial } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { PanelBody, PanelRow } from '@aarondewes/wp-components';
import {
	store as editorStore,
	PageAttributesCheck,
	PageAttributesOrder,
	PageAttributesParent,
} from '@aarondewes/wp-editor';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

/**
 * Module Constants
 */
const PANEL_NAME = 'page-attributes';

export function PageAttributes() {
	const { isEnabled, isOpened, postType } = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( editorStore );
		const { isEditorPanelEnabled, isEditorPanelOpened } = select(
			editPostStore
		);
		const { getPostType } = select( coreStore );
		return {
			isEnabled: isEditorPanelEnabled( PANEL_NAME ),
			isOpened: isEditorPanelOpened( PANEL_NAME ),
			postType: getPostType( getEditedPostAttribute( 'type' ) ),
		};
	}, [] );

	const { toggleEditorPanelOpened } = useDispatch( editPostStore );

	if ( ! isEnabled || ! postType ) {
		return null;
	}

	const onTogglePanel = partial( toggleEditorPanelOpened, PANEL_NAME );

	return (
		<PageAttributesCheck>
			<PanelBody
				title={ get(
					postType,
					[ 'labels', 'attributes' ],
					__( 'Page attributes' )
				) }
				opened={ isOpened }
				onToggle={ onTogglePanel }
			>
				<PageAttributesParent />
				<PanelRow>
					<PageAttributesOrder />
				</PanelRow>
			</PanelBody>
		</PageAttributesCheck>
	);
}

export default PageAttributes;
