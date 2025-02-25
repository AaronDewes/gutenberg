/**
 * WordPress dependencies
 */
import { SlotFillProvider } from '@aarondewes/wp-components';
import { render } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import PluginPrePublishPanel from '../';

describe( 'PluginPrePublishPanel', () => {
	test( 'renders fill properly', () => {
		const div = document.createElement( 'div' );
		render(
			<SlotFillProvider>
				<PluginPrePublishPanel
					className="my-plugin-pre-publish-panel"
					title="My panel title"
					initialOpen={ true }
				>
					My panel content
				</PluginPrePublishPanel>
				<PluginPrePublishPanel.Slot />
			</SlotFillProvider>,
			div
		);

		expect( div.innerHTML ).toMatchSnapshot();
	} );
} );
