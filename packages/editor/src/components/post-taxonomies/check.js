/**
 * External dependencies
 */
import { some, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@aarondewes/wp-compose';
import { withSelect } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export function PostTaxonomiesCheck( { postType, taxonomies, children } ) {
	const hasTaxonomies = some( taxonomies, ( taxonomy ) =>
		includes( taxonomy.types, postType )
	);
	if ( ! hasTaxonomies ) {
		return null;
	}

	return children;
}

export default compose( [
	withSelect( ( select ) => {
		return {
			postType: select( editorStore ).getCurrentPostType(),
			taxonomies: select( coreStore ).getTaxonomies( { per_page: -1 } ),
		};
	} ),
] )( PostTaxonomiesCheck );
