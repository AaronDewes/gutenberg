/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import { withDispatch, withSelect } from '@aarondewes/wp-data';
import { useRef, useEffect, useState } from '@aarondewes/wp-element';
import { compose, usePreferredColorSchemeStyle } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import styles from './editor.scss';
import variations from '../social-link/variations';

const ALLOWED_BLOCKS = variations.map(
	( v ) => `core/social-link-${ v.name }`
);

// Template contains the links that show when start.
const TEMPLATE = [
	[
		'core/social-link-wordpress',
		{ service: 'wordpress', url: 'https://wordpress.org' },
	],
	[ 'core/social-link-facebook', { service: 'facebook' } ],
	[ 'core/social-link-twitter', { service: 'twitter' } ],
	[ 'core/social-link-instagram', { service: 'instagram' } ],
];

function SocialLinksEdit( {
	shouldDelete,
	onDelete,
	isSelected,
	isInnerIconSelected,
	innerBlocks,
	attributes,
	activeInnerBlocks,
	getBlock,
	blockWidth,
} ) {
	const [ initialCreation, setInitialCreation ] = useState( true );
	const shouldRenderFooterAppender = isSelected || isInnerIconSelected;
	const { align } = attributes;
	const { marginLeft: spacing } = styles.spacing;

	useEffect( () => {
		if ( ! shouldRenderFooterAppender ) {
			setInitialCreation( false );
		}
	}, [ shouldRenderFooterAppender ] );

	const renderFooterAppender = useRef( () => (
		<View>
			<InnerBlocks.ButtonBlockAppender isFloating={ true } />
		</View>
	) );

	const placeholderStyle = usePreferredColorSchemeStyle(
		styles.placeholder,
		styles.placeholderDark
	);

	function renderPlaceholder() {
		return [
			...new Array( innerBlocks.length || 1 ),
		].map( ( _, index ) => (
			<View style={ placeholderStyle } key={ index } />
		) );
	}

	function filterInnerBlocks( blockIds ) {
		return blockIds.filter(
			( blockId ) => getBlock( blockId ).attributes.url
		);
	}

	if ( ! shouldRenderFooterAppender && activeInnerBlocks.length === 0 ) {
		return (
			<View style={ styles.placeholderWrapper }>
				{ renderPlaceholder() }
			</View>
		);
	}

	return (
		<InnerBlocks
			allowedBlocks={ ALLOWED_BLOCKS }
			templateLock={ false }
			template={ initialCreation && TEMPLATE }
			renderFooterAppender={
				shouldRenderFooterAppender && renderFooterAppender.current
			}
			orientation={ 'horizontal' }
			onDeleteBlock={ shouldDelete ? onDelete : undefined }
			marginVertical={ spacing }
			marginHorizontal={ spacing }
			horizontalAlignment={ align }
			filterInnerBlocks={
				! shouldRenderFooterAppender && filterInnerBlocks
			}
			blockWidth={ blockWidth }
		/>
	);
}

export default compose(
	withSelect( ( select, { clientId } ) => {
		const {
			getBlockCount,
			getBlockParents,
			getSelectedBlockClientId,
			getBlocks,
			getBlock,
		} = select( blockEditorStore );
		const selectedBlockClientId = getSelectedBlockClientId();
		const selectedBlockParents = getBlockParents(
			selectedBlockClientId,
			true
		);
		const innerBlocks = getBlocks( clientId );
		const activeInnerBlocks = innerBlocks.filter(
			( block ) => block.attributes?.url
		);

		return {
			shouldDelete: getBlockCount( clientId ) === 1,
			isInnerIconSelected: selectedBlockParents[ 0 ] === clientId,
			innerBlocks,
			activeInnerBlocks,
			getBlock,
		};
	} ),
	withDispatch( ( dispatch, { clientId } ) => {
		const { removeBlock } = dispatch( blockEditorStore );

		return {
			onDelete: () => {
				removeBlock( clientId, false );
			},
		};
	} )
)( SocialLinksEdit );
