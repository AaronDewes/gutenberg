/**
 * External dependencies
 */
import { invoke } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { TextControl } from '@aarondewes/wp-components';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';
import { useState } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';
import { store as editorStore } from '../../store';

export const PageAttributesOrder = ( { onUpdateOrder, order = 0 } ) => {
	const [ orderInput, setOrderInput ] = useState( null );

	const setUpdatedOrder = ( value ) => {
		setOrderInput( value );
		const newOrder = Number( value );
		if (
			Number.isInteger( newOrder ) &&
			invoke( value, [ 'trim' ] ) !== ''
		) {
			onUpdateOrder( Number( value ) );
		}
	};
	const value = orderInput === null ? order : orderInput;
	return (
		<TextControl
			className="editor-page-attributes__order"
			type="number"
			label={ __( 'Order' ) }
			value={ value }
			onChange={ setUpdatedOrder }
			size={ 6 }
			onBlur={ () => {
				setOrderInput( null );
			} }
		/>
	);
};

function PageAttributesOrderWithChecks( props ) {
	return (
		<PostTypeSupportCheck supportKeys="page-attributes">
			<PageAttributesOrder { ...props } />
		</PostTypeSupportCheck>
	);
}

export default compose( [
	withSelect( ( select ) => {
		return {
			order: select( editorStore ).getEditedPostAttribute( 'menu_order' ),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onUpdateOrder( order ) {
			dispatch( editorStore ).editPost( {
				menu_order: order,
			} );
		},
	} ) ),
] )( PageAttributesOrderWithChecks );
