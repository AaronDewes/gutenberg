/**
 * WordPress dependencies
 */
import { SlotFillProvider } from '@aarondewes/wp-components';
import { render } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import PluginPostPublishPanel from '../';

describe( 'PluginPostPublishPanel', () => {
	test( 'renders fill properly', () => {
		const div = document.createElement( 'div' );
		render(
			<SlotFillProvider>
				<PluginPostPublishPanel
					className="my-plugin-post-publish-panel"
					title="My panel title"
					initialOpen={ true }
				>
					My panel content
				</PluginPostPublishPanel>
				<PluginPostPublishPanel.Slot />
			</SlotFillProvider>,
			div
		);

		expect( div.innerHTML ).toMatchSnapshot();
	} );
} );
