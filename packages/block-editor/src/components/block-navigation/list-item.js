/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button, VisuallyHidden } from '@aarondewes/wp-components';
import {
	__experimentalGetBlockLabel as getBlockLabel,
	getBlockType,
} from '@aarondewes/wp-blocks';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';

export default function BlockNavigationListItem( {
	block,
	onClick,
	isSelected,
	wrapperComponent: WrapperComponent,
	children,
} ) {
	const blockType = getBlockType( block.name );

	return (
		<div className="block-editor-block-navigation__list-item">
			<WrapperComponent
				className={ classnames(
					'block-editor-block-navigation__list-item-button',
					{
						'is-selected': isSelected,
					}
				) }
				onClick={ onClick }
			>
				<BlockIcon icon={ blockType.icon } showColors />
				{ children
					? children
					: getBlockLabel( blockType, block.attributes ) }
				{ isSelected && (
					<VisuallyHidden as="span">
						{ __( '(selected block)' ) }
					</VisuallyHidden>
				) }
			</WrapperComponent>
		</div>
	);
}

BlockNavigationListItem.defaultProps = {
	onClick: () => {},
	wrapperComponent: ( props ) => <Button { ...props } />,
};
