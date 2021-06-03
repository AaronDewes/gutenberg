/**
 * WordPress dependencies
 */
import { __experimentalNavigationItem as NavigationItem } from '@aarondewes/wp-components';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { useCallback, useState } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { getPathAndQueryString } from '@aarondewes/wp-url';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { NavigationPanelPreviewFill } from '..';
import TemplatePreview from './template-preview';
import { store as editSiteStore } from '../../../store';

const getTitle = ( entity ) => {
	const title = entity.taxonomy ? entity.name : entity?.title?.rendered;

	// Make sure encoded characters are displayed as the characters they represent.
	const titleElement = document.createElement( 'div' );
	titleElement.innerHTML = title;

	return titleElement.textContent || titleElement.innerText || '';
};

export default function ContentNavigationItem( { item } ) {
	const [ isPreviewVisible, setIsPreviewVisible ] = useState( false );
	const previewContent = useSelect(
		( select ) => {
			if ( ! isPreviewVisible ) {
				return null;
			}

			const template = select(
				coreStore
			).__experimentalGetTemplateForLink( item.link );
			return template?.content?.raw;
		},
		[ isPreviewVisible ]
	);
	const { setPage, setIsNavigationPanelOpened } = useDispatch(
		editSiteStore
	);

	const onActivateItem = useCallback( () => {
		const { type, slug, link, id } = item;
		setPage( {
			type,
			slug,
			path: getPathAndQueryString( link ),
			context: {
				postType: type,
				postId: id,
			},
		} );
		setIsNavigationPanelOpened( false );
	}, [ setPage, item ] );

	if ( ! item ) {
		return null;
	}

	return (
		<>
			<NavigationItem
				className="edit-site-navigation-panel__content-item"
				item={ `${ item.taxonomy || item.type }-${ item.id }` }
				title={ getTitle( item ) || __( '(no title)' ) }
				onClick={ onActivateItem }
				onMouseEnter={ () => setIsPreviewVisible( true ) }
				onMouseLeave={ () => setIsPreviewVisible( false ) }
			/>

			{ isPreviewVisible && previewContent && (
				<NavigationPanelPreviewFill>
					<TemplatePreview
						rawContent={ previewContent }
						blockContext={ {
							postType: item.type,
							postId: item.id,
						} }
					/>
				</NavigationPanelPreviewFill>
			) }
		</>
	);
}
