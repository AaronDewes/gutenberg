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
import { storeConfig as blockEditorStoreConfig } from '@aarondewes/wp-block-editor';

/**
 * Internal dependencies
 */
import { storeConfig } from '../../store';

const withRegistryProvider = createHigherOrderComponent(
	( WrappedComponent ) =>
		withRegistry( ( props ) => {
			const {
				useSubRegistry = true,
				registry,
				...additionalProps
			} = props;
			if ( ! useSubRegistry ) {
				return <WrappedComponent { ...additionalProps } />;
			}

			const [ subRegistry, setSubRegistry ] = useState( null );
			useEffect( () => {
				const newRegistry = createRegistry(
					{
						'core/block-editor': blockEditorStoreConfig,
					},
					registry
				);
				newRegistry.registerStore( 'core/editor', storeConfig );
				setSubRegistry( newRegistry );
			}, [ registry ] );

			if ( ! subRegistry ) {
				return null;
			}

			return (
				<RegistryProvider value={ subRegistry }>
					<WrappedComponent { ...additionalProps } />
				</RegistryProvider>
			);
		} ),
	'withRegistryProvider'
);

export default withRegistryProvider;
