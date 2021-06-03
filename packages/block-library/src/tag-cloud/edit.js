/**
 * External dependencies
 */
import { map, filter } from 'lodash';

/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl, SelectControl } from '@aarondewes/wp-components';
import { withSelect } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { InspectorControls, useBlockProps } from '@aarondewes/wp-block-editor';
import ServerSideRender from '@aarondewes/wp-server-side-render';
import { store as coreStore } from '@aarondewes/wp-core-data';

function TagCloudEdit( { attributes, setAttributes, taxonomies } ) {
	const { taxonomy, showTagCounts } = attributes;

	const getTaxonomyOptions = () => {
		const selectOption = {
			label: __( '- Select -' ),
			value: '',
			disabled: true,
		};
		const taxonomyOptions = map(
			filter( taxonomies, 'show_cloud' ),
			( item ) => {
				return {
					value: item.slug,
					label: item.name,
				};
			}
		);

		return [ selectOption, ...taxonomyOptions ];
	};

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Tag Cloud settings' ) }>
				<SelectControl
					label={ __( 'Taxonomy' ) }
					options={ getTaxonomyOptions() }
					value={ taxonomy }
					onChange={ ( selectedTaxonomy ) =>
						setAttributes( { taxonomy: selectedTaxonomy } )
					}
				/>
				<ToggleControl
					label={ __( 'Show post counts' ) }
					checked={ showTagCounts }
					onChange={ () =>
						setAttributes( { showTagCounts: ! showTagCounts } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<>
			{ inspectorControls }
			<div { ...useBlockProps() }>
				<ServerSideRender
					key="tag-cloud"
					block="core/tag-cloud"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}

export default withSelect( ( select ) => {
	return {
		taxonomies: select( coreStore ).getTaxonomies( { per_page: -1 } ),
	};
} )( TagCloudEdit );
