/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@aarondewes/wp-element';
import {
	withRegistry,
	createRegistry,
	RegistryProvider,
} from '@aarondewes/wp-data';
import { createHigherOrderComponent } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { storeConfig } from '../../store';
import { STORE_NAME as blockEditorStoreName } from '../../store/constants';

const withRegistryProvider = createHigherOrderComponent(
	( WrappedComponent ) => {
		return withRegistry(
			( { useSubRegistry = true, registry, ...props } ) => {
				if ( ! useSubRegistry ) {
					return (
						<WrappedComponent registry={ registry } { ...props } />
					);
				}

				const [ subRegistry, setSubRegistry ] = useState( null );
				useEffect( () => {
					const newRegistry = createRegistry( {}, registry );
					newRegistry.registerStore(
						blockEditorStoreName,
						storeConfig
					);
					setSubRegistry( newRegistry );
				}, [ registry ] );

				if ( ! subRegistry ) {
					return null;
				}

				return (
					<RegistryProvider value={ subRegistry }>
						<WrappedComponent
							registry={ subRegistry }
							{ ...props }
						/>
					</RegistryProvider>
				);
			}
		);
	},
	'withRegistryProvider'
);

export default withRegistryProvider;
