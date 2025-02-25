/**
 * External dependencies
 */
import { defaultTo } from 'lodash';

/**
 * WordPress dependencies
 */
import { SlotFillProvider } from '@aarondewes/wp-components';
import { uploadMedia } from '@aarondewes/wp-media-utils';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { useMemo } from '@aarondewes/wp-element';
import {
	BlockEditorProvider,
	BlockEditorKeyboardShortcuts,
} from '@aarondewes/wp-block-editor';
import { ReusableBlocksMenuItems } from '@aarondewes/wp-reusable-blocks';

/**
 * Internal dependencies
 */
import KeyboardShortcuts from '../keyboard-shortcuts';
import { useEntityBlockEditor, store as coreStore } from '@aarondewes/wp-core-data';
import { buildWidgetAreasPostId, KIND, POST_TYPE } from '../../store/utils';
import useLastSelectedWidgetArea from '../../hooks/use-last-selected-widget-area';
import { store as editWidgetsStore } from '../../store';

export default function WidgetAreasBlockEditorProvider( {
	blockEditorSettings,
	children,
	...props
} ) {
	const {
		hasUploadPermissions,
		reusableBlocks,
		isFixedToolbarActive,
		keepCaretInsideBlock,
	} = useSelect(
		( select ) => ( {
			hasUploadPermissions: defaultTo(
				select( coreStore ).canUser( 'create', 'media' ),
				true
			),
			widgetAreas: select( editWidgetsStore ).getWidgetAreas(),
			widgets: select( editWidgetsStore ).getWidgets(),
			reusableBlocks: select( coreStore ).getEntityRecords(
				'postType',
				'wp_block'
			),
			isFixedToolbarActive: select(
				editWidgetsStore
			).__unstableIsFeatureActive( 'fixedToolbar' ),
			keepCaretInsideBlock: select(
				editWidgetsStore
			).__unstableIsFeatureActive( 'keepCaretInsideBlock' ),
		} ),
		[]
	);
	const { setIsInserterOpened } = useDispatch( editWidgetsStore );

	const settings = useMemo( () => {
		let mediaUploadBlockEditor;
		if ( hasUploadPermissions ) {
			mediaUploadBlockEditor = ( { onError, ...argumentsObject } ) => {
				uploadMedia( {
					wpAllowedMimeTypes: blockEditorSettings.allowedMimeTypes,
					onError: ( { message } ) => onError( message ),
					...argumentsObject,
				} );
			};
		}
		return {
			...blockEditorSettings,
			__experimentalReusableBlocks: reusableBlocks,
			hasFixedToolbar: isFixedToolbarActive,
			keepCaretInsideBlock,
			mediaUpload: mediaUploadBlockEditor,
			templateLock: 'all',
			__experimentalSetIsInserterOpened: setIsInserterOpened,
		};
	}, [
		blockEditorSettings,
		isFixedToolbarActive,
		keepCaretInsideBlock,
		hasUploadPermissions,
		reusableBlocks,
		setIsInserterOpened,
	] );

	const widgetAreaId = useLastSelectedWidgetArea();

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		KIND,
		POST_TYPE,
		{ id: buildWidgetAreasPostId() }
	);

	return (
		<>
			<BlockEditorKeyboardShortcuts.Register />
			<KeyboardShortcuts.Register />
			<SlotFillProvider>
				<BlockEditorProvider
					value={ blocks }
					onInput={ onInput }
					onChange={ onChange }
					settings={ settings }
					useSubRegistry={ false }
					{ ...props }
				>
					{ children }
					<ReusableBlocksMenuItems rootClientId={ widgetAreaId } />
				</BlockEditorProvider>
			</SlotFillProvider>
		</>
	);
}
