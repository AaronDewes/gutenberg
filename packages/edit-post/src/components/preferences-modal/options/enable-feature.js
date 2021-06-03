/**
 * WordPress dependencies
 */
import { compose } from '@aarondewes/wp-compose';
import { withSelect, withDispatch } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import BaseOption from './base';
import { store as editPostStore } from '../../../store';

export default compose(
	withSelect( ( select, { featureName } ) => {
		const { isFeatureActive } = select( editPostStore );
		return {
			isChecked: isFeatureActive( featureName ),
		};
	} ),
	withDispatch( ( dispatch, { featureName } ) => ( {
		onChange: () => dispatch( editPostStore ).toggleFeature( featureName ),
	} ) )
)( BaseOption );
