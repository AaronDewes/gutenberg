/**
 * External dependencies
 */
import { filter, identity, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { Fragment } from '@aarondewes/wp-element';
import { withSelect } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import HierarchicalTermSelector from './hierarchical-term-selector';
import FlatTermSelector from './flat-term-selector';
import { store as editorStore } from '../../store';

export function PostTaxonomies( {
	postType,
	taxonomies,
	taxonomyWrapper = identity,
} ) {
	const availableTaxonomies = filter( taxonomies, ( taxonomy ) =>
		includes( taxonomy.types, postType )
	);
	const visibleTaxonomies = filter(
		availableTaxonomies,
		( taxonomy ) => taxonomy.visibility.show_ui
	);
	return visibleTaxonomies.map( ( taxonomy ) => {
		const TaxonomyComponent = taxonomy.hierarchical
			? HierarchicalTermSelector
			: FlatTermSelector;
		return (
			<Fragment key={ `taxonomy-${ taxonomy.slug }` }>
				{ taxonomyWrapper(
					<TaxonomyComponent slug={ taxonomy.slug } />,
					taxonomy
				) }
			</Fragment>
		);
	} );
}

export default compose( [
	withSelect( ( select ) => {
		return {
			postType: select( editorStore ).getCurrentPostType(),
			taxonomies: select( coreStore ).getTaxonomies( { per_page: -1 } ),
		};
	} ),
] )( PostTaxonomies );
