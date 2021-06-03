/**
 * WordPress dependencies
 */
import { hasBlockSupport, isReusableBlock } from '@aarondewes/wp-blocks';
import {
	BlockSettingsMenuControls,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { useCallback, useState } from '@aarondewes/wp-element';
import {
	MenuItem,
	Modal,
	Button,
	TextControl,
	Flex,
	FlexItem,
} from '@aarondewes/wp-components';
import { reusableBlock } from '@aarondewes/wp-icons';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { store as noticesStore } from '@aarondewes/wp-notices';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store } from '../../store';

/**
 * Menu control to convert block(s) to reusable block.
 *
 * @param {Object}   props              Component props.
 * @param {string[]} props.clientIds    Client ids of selected blocks.
 * @param {string}   props.rootClientId ID of the currently selected top-level block.
 * @return {import('@aarondewes/wp-element').WPComponent} The menu control or null.
 */
export default function ReusableBlockConvertButton( {
	clientIds,
	rootClientId,
} ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ title, setTitle ] = useState( '' );
	const canConvert = useSelect(
		( select ) => {
			const { canUser } = select( coreStore );
			const { getBlocksByClientId, canInsertBlockType } = select(
				blockEditorStore
			);

			const blocks = getBlocksByClientId( clientIds ) ?? [];

			const isReusable =
				blocks.length === 1 &&
				blocks[ 0 ] &&
				isReusableBlock( blocks[ 0 ] ) &&
				!! select( coreStore ).getEntityRecord(
					'postType',
					'wp_block',
					blocks[ 0 ].attributes.ref
				);

			const _canConvert =
				// Hide when this is already a reusable block.
				! isReusable &&
				// Hide when reusable blocks are disabled.
				canInsertBlockType( 'core/block', rootClientId ) &&
				blocks.every(
					( block ) =>
						// Guard against the case where a regular block has *just* been converted.
						!! block &&
						// Hide on invalid blocks.
						block.isValid &&
						// Hide when block doesn't support being made reusable.
						hasBlockSupport( block.name, 'reusable', true )
				) &&
				// Hide when current doesn't have permission to do that.
				!! canUser( 'create', 'blocks' );

			return _canConvert;
		},
		[ clientIds ]
	);

	const {
		__experimentalConvertBlocksToReusable: convertBlocksToReusable,
	} = useDispatch( store );

	const { createSuccessNotice, createErrorNotice } = useDispatch(
		noticesStore
	);
	const onConvert = useCallback(
		async function ( reusableBlockTitle ) {
			try {
				await convertBlocksToReusable( clientIds, reusableBlockTitle );
				createSuccessNotice( __( 'Reusable block created.' ), {
					type: 'snackbar',
				} );
			} catch ( error ) {
				createErrorNotice( error.message, {
					type: 'snackbar',
				} );
			}
		},
		[ clientIds ]
	);

	if ( ! canConvert ) {
		return null;
	}

	return (
		<BlockSettingsMenuControls>
			{ ( { onClose } ) => (
				<>
					<MenuItem
						icon={ reusableBlock }
						onClick={ () => {
							setIsModalOpen( true );
						} }
					>
						{ __( 'Add to Reusable blocks' ) }
					</MenuItem>
					{ isModalOpen && (
						<Modal
							title={ __( 'Create Reusable block' ) }
							closeLabel={ __( 'Close' ) }
							onRequestClose={ () => {
								setIsModalOpen( false );
								setTitle( '' );
							} }
							overlayClassName="reusable-blocks-menu-items__convert-modal"
						>
							<form
								onSubmit={ ( event ) => {
									event.preventDefault();
									onConvert( title );
									setIsModalOpen( false );
									setTitle( '' );
									onClose();
								} }
							>
								<TextControl
									label={ __( 'Name' ) }
									value={ title }
									onChange={ setTitle }
								/>
								<Flex
									className="reusable-blocks-menu-items__convert-modal-actions"
									justify="flex-end"
								>
									<FlexItem>
										<Button
											variant="secondary"
											onClick={ () => {
												setIsModalOpen( false );
												setTitle( '' );
											} }
										>
											{ __( 'Cancel' ) }
										</Button>
									</FlexItem>
									<FlexItem>
										<Button variant="primary" type="submit">
											{ __( 'Save' ) }
										</Button>
									</FlexItem>
								</Flex>
							</form>
						</Modal>
					) }
				</>
			) }
		</BlockSettingsMenuControls>
	);
}
