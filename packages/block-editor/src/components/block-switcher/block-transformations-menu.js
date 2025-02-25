/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { MenuGroup, MenuItem } from '@aarondewes/wp-components';
import {
	getBlockMenuDefaultClassName,
	switchToBlockType,
} from '@aarondewes/wp-blocks';
import { useState } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import PreviewBlockPopover from './preview-block-popover';

const BlockTransformationsMenu = ( {
	className,
	possibleBlockTransformations,
	onSelect,
	blocks,
} ) => {
	const [
		hoveredTransformItemName,
		setHoveredTransformItemName,
	] = useState();
	return (
		<MenuGroup label={ __( 'Transform to' ) } className={ className }>
			{ hoveredTransformItemName && (
				<PreviewBlockPopover
					blocks={ switchToBlockType(
						blocks,
						hoveredTransformItemName
					) }
				/>
			) }
			{ possibleBlockTransformations.map( ( item ) => {
				const { name, icon, title, isDisabled } = item;
				return (
					<MenuItem
						key={ name }
						className={ getBlockMenuDefaultClassName( name ) }
						onClick={ ( event ) => {
							event.preventDefault();
							onSelect( name );
						} }
						disabled={ isDisabled }
						onMouseLeave={ () =>
							setHoveredTransformItemName( null )
						}
						onMouseEnter={ () =>
							setHoveredTransformItemName( name )
						}
					>
						<BlockIcon icon={ icon } showColors />
						{ title }
					</MenuItem>
				);
			} ) }
		</MenuGroup>
	);
};

export default BlockTransformationsMenu;
