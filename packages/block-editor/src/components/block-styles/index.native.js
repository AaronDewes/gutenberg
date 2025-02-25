/**
 * External dependencies
 */
import { ScrollView } from 'react-native';
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@aarondewes/wp-blocks';
import { useSelect, useDispatch } from '@aarondewes/wp-data';
import { useMemo } from '@aarondewes/wp-element';
import { _x } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import { getActiveStyle, replaceActiveStyle } from './utils';
import StylePreview from './preview';
import containerStyles from './style.scss';
import { store as blockEditorStore } from '../../store';

function BlockStyles( { clientId, url } ) {
	const selector = ( select ) => {
		const { getBlock } = select( blockEditorStore );
		const { getBlockStyles } = select( blocksStore );
		const block = getBlock( clientId );
		return {
			styles: getBlockStyles( block.name ),
			className: block.attributes.className || '',
		};
	};

	const { styles, className } = useSelect( selector, [ clientId ] );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const renderedStyles = find( styles, 'isDefault' )
		? styles
		: [
				{
					name: 'default',
					label: _x( 'Default', 'block style' ),
					isDefault: true,
				},
				...styles,
		  ];

	const mappedRenderedStyles = useMemo( () => {
		const activeStyle = getActiveStyle( renderedStyles, className );

		return renderedStyles.map( ( style ) => {
			const styleClassName = replaceActiveStyle(
				className,
				activeStyle,
				style
			);
			const isActive = activeStyle === style;

			const onStylePress = () => {
				updateBlockAttributes( clientId, {
					className: styleClassName,
				} );
			};

			return (
				<StylePreview
					onPress={ onStylePress }
					isActive={ isActive }
					key={ style.name }
					style={ style }
					url={ url }
				/>
			);
		} );
	}, [ renderedStyles, className, clientId ] );

	if ( ! styles || styles.length === 0 ) {
		return null;
	}

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={ false }
			contentContainerStyle={ containerStyles.content }
		>
			{ mappedRenderedStyles }
		</ScrollView>
	);
}

export default BlockStyles;
