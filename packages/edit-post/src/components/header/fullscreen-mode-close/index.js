/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { Button, Icon } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { addQueryArgs } from '@aarondewes/wp-url';
import { wordpress } from '@aarondewes/wp-icons';
import { store as editorStore } from '@aarondewes/wp-editor';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

function FullscreenModeClose( { showTooltip, icon, href } ) {
	const { isActive, isRequestingSiteIcon, postType, siteIconUrl } = useSelect(
		( select ) => {
			const { getCurrentPostType } = select( editorStore );
			const { isFeatureActive } = select( editPostStore );
			const { isResolving } = select( 'core/data' );
			const { getEntityRecord, getPostType } = select( coreStore );
			const siteData =
				getEntityRecord( 'root', '__unstableBase', undefined ) || {};

			return {
				isActive: isFeatureActive( 'fullscreenMode' ),
				isRequestingSiteIcon: isResolving( 'core', 'getEntityRecord', [
					'root',
					'__unstableBase',
					undefined,
				] ),
				postType: getPostType( getCurrentPostType() ),
				siteIconUrl: siteData.site_icon_url,
			};
		},
		[]
	);

	if ( ! isActive || ! postType ) {
		return null;
	}

	let buttonIcon = <Icon size="36px" icon={ wordpress } />;

	if ( siteIconUrl ) {
		buttonIcon = (
			<img
				alt={ __( 'Site Icon' ) }
				className="edit-post-fullscreen-mode-close_site-icon"
				src={ siteIconUrl }
			/>
		);
	}

	if ( isRequestingSiteIcon ) {
		buttonIcon = null;
	}

	// Override default icon if custom icon is provided via props.
	if ( icon ) {
		buttonIcon = <Icon size="36px" icon={ icon } />;
	}

	return (
		<Button
			className="edit-post-fullscreen-mode-close has-icon"
			href={
				href ??
				addQueryArgs( 'edit.php', {
					post_type: postType.slug,
				} )
			}
			label={ get( postType, [ 'labels', 'view_items' ], __( 'Back' ) ) }
			showTooltip={ showTooltip }
		>
			{ buttonIcon }
		</Button>
	);
}

export default FullscreenModeClose;
