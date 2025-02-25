/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { useBlockEditContext } from '../block-edit/context';

const withClientId = createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		const { clientId } = useBlockEditContext();
		return <WrappedComponent { ...props } clientId={ clientId } />;
	},
	'withClientId'
);

export default withClientId;
