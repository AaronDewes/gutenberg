/**
 * WordPress dependencies
 */
import {
	Button,
	__experimentalNavigationItem as NavigationItem,
} from '@aarondewes/wp-components';
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { useState } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { store as editorStore } from '@aarondewes/wp-editor';

/**
 * Internal dependencies
 */
import TemplatePreview from './template-preview';
import { NavigationPanelPreviewFill } from '../index';
import { store as editSiteStore } from '../../../store';

export default function TemplateNavigationItem( { item } ) {
	const { title, description } = useSelect(
		( select ) =>
			'wp_template' === item.type
				? select( editorStore ).__experimentalGetTemplateInfo( item )
				: {
						title: item?.title?.rendered || item?.slug,
						description: '',
				  },
		[]
	);
	const {
		setTemplate,
		setTemplatePart,
		setIsNavigationPanelOpened,
	} = useDispatch( editSiteStore );
	const [ isPreviewVisible, setIsPreviewVisible ] = useState( false );

	if ( ! item ) {
		return null;
	}

	const onActivateItem = () => {
		if ( 'wp_template' === item.type ) {
			setTemplate( item.id, item.slug );
		} else {
			setTemplatePart( item.id );
		}
		setIsNavigationPanelOpened( false );
	};

	return (
		<NavigationItem
			className="edit-site-navigation-panel__template-item"
			item={ `${ item.type }-${ item.id }` }
		>
			<Button
				onClick={ onActivateItem }
				onMouseEnter={ () => setIsPreviewVisible( true ) }
				onMouseLeave={ () => setIsPreviewVisible( false ) }
			>
				<span className="edit-site-navigation-panel__info-wrapper">
					<div className="edit-site-navigation-panel__template-item-title">
						{ 'draft' === item.status && (
							<em>{ __( '[Draft]' ) }</em>
						) }
						{ title }
					</div>
					{ description && (
						<div className="edit-site-navigation-panel__template-item-description">
							{ description }
						</div>
					) }
				</span>
			</Button>

			{ isPreviewVisible && (
				<NavigationPanelPreviewFill>
					<TemplatePreview rawContent={ item.content.raw } />
				</NavigationPanelPreviewFill>
			) }
		</NavigationItem>
	);
}
