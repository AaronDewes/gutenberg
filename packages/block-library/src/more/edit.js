/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { PanelBody, ToggleControl } from '@aarondewes/wp-components';
import { InspectorControls, useBlockProps } from '@aarondewes/wp-block-editor';
import { ENTER } from '@aarondewes/wp-keycodes';
import { getDefaultBlockName, createBlock } from '@aarondewes/wp-blocks';

const DEFAULT_TEXT = __( 'Read more' );

export default function MoreEdit( {
	attributes: { customText, noTeaser },
	insertBlocksAfter,
	setAttributes,
} ) {
	const onChangeInput = ( event ) => {
		setAttributes( {
			customText:
				event.target.value !== '' ? event.target.value : undefined,
		} );
	};

	const onKeyDown = ( { keyCode } ) => {
		if ( keyCode === ENTER ) {
			insertBlocksAfter( [ createBlock( getDefaultBlockName() ) ] );
		}
	};

	const getHideExcerptHelp = ( checked ) =>
		checked
			? __( 'The excerpt is hidden.' )
			: __( 'The excerpt is visible.' );

	const toggleHideExcerpt = () => setAttributes( { noTeaser: ! noTeaser } );

	const style = {
		width: `${ ( customText ? customText : DEFAULT_TEXT ).length + 1.2 }em`,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={ __(
							'Hide the excerpt on the full content page'
						) }
						checked={ !! noTeaser }
						onChange={ toggleHideExcerpt }
						help={ getHideExcerptHelp }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div className="wp-block-more">
					<input
						aria-label={ __( 'Read more link text' ) }
						type="text"
						value={ customText }
						placeholder={ DEFAULT_TEXT }
						onChange={ onChangeInput }
						onKeyDown={ onKeyDown }
						style={ style }
					/>
				</div>
			</div>
		</>
	);
}
