/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */
import { useCallback, useState } from '@aarondewes/wp-element';
import {
	createHigherOrderComponent,
	__experimentalUseFocusOutside as useFocusOutside,
} from '@aarondewes/wp-compose';

export default createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		const [ handleFocusOutside, setHandleFocusOutside ] = useState();
		const bindFocusOutsideHandler = useCallback(
			( node ) =>
				setHandleFocusOutside( () =>
					node?.handleFocusOutside
						? node.handleFocusOutside.bind( node )
						: undefined
				),
			[]
		);

		return (
			<View { ...useFocusOutside( handleFocusOutside ) }>
				<WrappedComponent
					ref={ bindFocusOutsideHandler }
					{ ...props }
				/>
			</View>
		);
	},
	'withFocusOutside'
);
