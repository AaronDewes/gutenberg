/**
 * WordPress dependencies
 */
import isShallowEqual from '@aarondewes/wp-is-shallow-equal';
import { Component } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import createHigherOrderComponent from '../../utils/create-higher-order-component';
// eslint-disable-next-line no-duplicate-imports
import type { SimpleHigherOrderComponent } from '../../utils/create-higher-order-component';

/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import type { ComponentType, ComponentClass } from 'react';

/**
 * Given a component returns the enhanced component augmented with a component
 * only rerendering when its props/state change
 */
const pure: SimpleHigherOrderComponent = createHigherOrderComponent(
	< TProps, >( Wrapped: ComponentType< TProps > ) => {
		if ( Wrapped.prototype instanceof Component ) {
			return class extends ( Wrapped as ComponentClass< TProps > ) {
				shouldComponentUpdate( nextProps: TProps, nextState: any ) {
					return (
						! isShallowEqual( nextProps, this.props ) ||
						! isShallowEqual( nextState, this.state )
					);
				}
			};
		}

		return class extends Component< TProps > {
			shouldComponentUpdate( nextProps: TProps ) {
				return ! isShallowEqual( nextProps, this.props );
			}

			render() {
				return <Wrapped { ...this.props } />;
			}
		};
	},
	'pure'
);

export default pure;
