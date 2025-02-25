/**
 * External dependencies
 */
import classnames from 'classnames';
import { isFunction } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { createInterpolateElement } from '@aarondewes/wp-element';
import { Icon, plus } from '@aarondewes/wp-icons';

export const LinkControlSearchCreate = ( {
	searchTerm,
	onClick,
	itemProps,
	isSelected,
	buttonText,
} ) => {
	if ( ! searchTerm ) {
		return null;
	}

	let text;
	if ( buttonText ) {
		text = isFunction( buttonText ) ? buttonText( searchTerm ) : buttonText;
	} else {
		text = createInterpolateElement(
			sprintf(
				/* translators: %s: search term. */
				__( 'Create: <mark>%s</mark>' ),
				searchTerm
			),
			{ mark: <mark /> }
		);
	}

	return (
		<Button
			{ ...itemProps }
			className={ classnames(
				'block-editor-link-control__search-create block-editor-link-control__search-item',
				{
					'is-selected': isSelected,
				}
			) }
			onClick={ onClick }
		>
			<Icon
				className="block-editor-link-control__search-item-icon"
				icon={ plus }
			/>

			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					{ text }
				</span>
			</span>
		</Button>
	);
};

export default LinkControlSearchCreate;
