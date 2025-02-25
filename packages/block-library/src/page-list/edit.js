/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	BlockControls,
	useBlockProps,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';
import ServerSideRender from '@aarondewes/wp-server-side-render';
import { ToolbarButton } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { useEffect, useState } from '@aarondewes/wp-element';
import { useSelect } from '@aarondewes/wp-data';
import apiFetch from '@aarondewes/wp-api-fetch';
import { addQueryArgs } from '@aarondewes/wp-url';

/**
 * Internal dependencies
 */
import ConvertToLinksModal from './convert-to-links-modal';

// We only show the edit option when page count is <= MAX_PAGE_COUNT
// Performance of Navigation Links is not good past this value.
const MAX_PAGE_COUNT = 100;

export default function PageListEdit( { context, clientId } ) {
	const { textColor, backgroundColor, showSubmenuIcon, style } =
		context || {};

	const [ allowConvertToLinks, setAllowConvertToLinks ] = useState( false );

	const blockProps = useBlockProps( {
		className: classnames( {
			'has-text-color': !! textColor,
			[ `has-${ textColor }-color` ]: !! textColor,
			'has-background': !! backgroundColor,
			[ `has-${ backgroundColor }-background-color` ]: !! backgroundColor,
			'show-submenu-icons': !! showSubmenuIcon,
		} ),
		style: { ...style?.color },
	} );

	const isParentNavigation = useSelect(
		( select ) => {
			const { getBlockParentsByBlockName } = select( blockEditorStore );
			return (
				getBlockParentsByBlockName( clientId, 'core/navigation' )
					.length > 0
			);
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( isParentNavigation ) {
			apiFetch( {
				path: addQueryArgs( '/wp/v2/pages', {
					per_page: 1,
					_fields: [ 'id' ],
				} ),
				parse: false,
			} ).then( ( res ) => {
				setAllowConvertToLinks(
					res.headers.get( 'X-WP-Total' ) <= MAX_PAGE_COUNT
				);
			} );
		} else {
			setAllowConvertToLinks( false );
		}
	}, [ isParentNavigation ] );

	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<>
			{ allowConvertToLinks && (
				<BlockControls group="other">
					<ToolbarButton title={ __( 'Edit' ) } onClick={ openModal }>
						{ __( 'Edit' ) }
					</ToolbarButton>
				</BlockControls>
			) }
			{ allowConvertToLinks && isOpen && (
				<ConvertToLinksModal
					onClose={ closeModal }
					clientId={ clientId }
				/>
			) }
			<div { ...blockProps }>
				<ServerSideRender block="core/page-list" />
			</div>
		</>
	);
}
