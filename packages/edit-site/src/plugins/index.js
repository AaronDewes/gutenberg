/**
 * External dependencies
 */
import downloadjs from 'downloadjs';

/**
 * WordPress dependencies
 */
import { MenuItem } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { registerPlugin } from '@aarondewes/wp-plugins';
import apiFetch from '@aarondewes/wp-api-fetch';
import { download } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';

registerPlugin( 'edit-site', {
	render() {
		return (
			<>
				<ToolsMoreMenuGroup>
					<MenuItem
						role="menuitem"
						icon={ download }
						onClick={ () =>
							apiFetch( {
								path: '/__experimental/edit-site/v1/export',
								parse: false,
							} )
								.then( ( res ) => res.blob() )
								.then( ( blob ) =>
									downloadjs(
										blob,
										'edit-site-export.zip',
										'application/zip'
									)
								)
						}
						info={ __(
							'Download your templates and template parts.'
						) }
					>
						{ __( 'Export' ) }
					</MenuItem>
				</ToolsMoreMenuGroup>
			</>
		);
	},
} );
