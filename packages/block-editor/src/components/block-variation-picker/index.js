/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Button, Placeholder } from '@aarondewes/wp-components';
import { layout } from '@aarondewes/wp-icons';

function BlockVariationPicker( {
	icon = layout,
	label = __( 'Choose variation' ),
	instructions = __( 'Select a variation to start with.' ),
	variations,
	onSelect,
	allowSkip,
} ) {
	const classes = classnames( 'block-editor-block-variation-picker', {
		'has-many-variations': variations.length > 4,
	} );

	return (
		<Placeholder
			icon={ icon }
			label={ label }
			instructions={ instructions }
			className={ classes }
		>
			{ /*
			 * Disable reason: The `list` ARIA role is redundant but
			 * Safari+VoiceOver won't announce the list otherwise.
			 */
			/* eslint-disable jsx-a11y/no-redundant-roles */ }
			<ul
				className="block-editor-block-variation-picker__variations"
				role="list"
				aria-label={ __( 'Block variations' ) }
			>
				{ variations.map( ( variation ) => (
					<li key={ variation.name }>
						<Button
							variant="secondary"
							icon={ variation.icon }
							iconSize={ 48 }
							onClick={ () => onSelect( variation ) }
							className="block-editor-block-variation-picker__variation"
							label={ variation.description || variation.title }
						/>
						<span
							className="block-editor-block-variation-picker__variation-label"
							role="presentation"
						>
							{ variation.title }
						</span>
					</li>
				) ) }
			</ul>
			{ /* eslint-enable jsx-a11y/no-redundant-roles */ }
			{ allowSkip && (
				<div className="block-editor-block-variation-picker__skip">
					<Button variant="link" onClick={ () => onSelect() }>
						{ __( 'Skip' ) }
					</Button>
				</div>
			) }
		</Placeholder>
	);
}

export default BlockVariationPicker;
