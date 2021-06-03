/**
 * External dependencies
 */
import { last } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@aarondewes/wp-compose';
import { withSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import BaseDefaultBlockAppender from '../default-block-appender';
import withClientId from './with-client-id';
import { store as blockEditorStore } from '../../store';

export const DefaultBlockAppender = ( { clientId, lastBlockClientId } ) => {
	return (
		<BaseDefaultBlockAppender
			rootClientId={ clientId }
			lastBlockClientId={ lastBlockClientId }
		/>
	);
};

export default compose( [
	withClientId,
	withSelect( ( select, { clientId } ) => {
		const { getBlockOrder } = select( blockEditorStore );

		const blockClientIds = getBlockOrder( clientId );

		return {
			lastBlockClientId: last( blockClientIds ),
		};
	} ),
] )( DefaultBlockAppender );
