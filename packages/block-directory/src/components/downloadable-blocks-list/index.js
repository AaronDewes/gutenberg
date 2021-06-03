/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import {
	__unstableComposite as Composite,
	__unstableUseCompositeState as useCompositeState,
} from '@aarondewes/wp-components';
import { getBlockType } from '@aarondewes/wp-blocks';
import { useDispatch } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import DownloadableBlockListItem from '../downloadable-block-list-item';
import { store as blockDirectoryStore } from '../../store';

function DownloadableBlocksList( { items, onHover = noop, onSelect } ) {
	const composite = useCompositeState();
	const { installBlockType } = useDispatch( blockDirectoryStore );

	if ( ! items.length ) {
		return null;
	}

	return (
		<Composite
			{ ...composite }
			role="listbox"
			className="block-directory-downloadable-blocks-list"
			aria-label={ __( 'Blocks available for install' ) }
		>
			{ items.map( ( item ) => {
				return (
					<DownloadableBlockListItem
						key={ item.id }
						composite={ composite }
						onClick={ () => {
							// Check if the block is registered (`getBlockType`
							// will return an object). If so, insert the block.
							// This prevents installing existing plugins.
							if ( getBlockType( item.name ) ) {
								onSelect( item );
							} else {
								installBlockType( item ).then( ( success ) => {
									if ( success ) {
										onSelect( item );
									}
								} );
							}
							onHover( null );
						} }
						onHover={ onHover }
						item={ item }
					/>
				);
			} ) }
		</Composite>
	);
}

export default DownloadableBlocksList;
