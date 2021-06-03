/**
 * WordPress dependencies
 */
import { registerPlugin } from '@aarondewes/wp-plugins';
import { addFilter } from '@aarondewes/wp-hooks';

/**
 * Internal dependencies
 */
import AutoBlockUninstaller from '../components/auto-block-uninstaller';
import InserterMenuDownloadableBlocksPanel from './inserter-menu-downloadable-blocks-panel';
import InstalledBlocksPrePublishPanel from './installed-blocks-pre-publish-panel';
import getInstallMissing from './get-install-missing';

registerPlugin( 'block-directory', {
	render() {
		return (
			<>
				<AutoBlockUninstaller />
				<InserterMenuDownloadableBlocksPanel />
				<InstalledBlocksPrePublishPanel />
			</>
		);
	},
} );

addFilter(
	'blocks.registerBlockType',
	'block-directory/fallback',
	( settings, name ) => {
		if ( name !== 'core/missing' ) {
			return settings;
		}
		settings.edit = getInstallMissing( settings.edit );

		return settings;
	}
);
