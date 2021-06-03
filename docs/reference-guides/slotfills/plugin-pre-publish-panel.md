# PluginPrePublishPanel

This slot allows for injecting items into the bottom of the pre-publish panel that appears to confirm publishing after the user clicks "Publish".

## Example

```js
import { registerPlugin } from '@aarondewes/wp-plugins';
import { PluginPrePublishPanel } from '@aarondewes/wp-edit-post';

const PluginPrePublishPanelTest = () => (
	<PluginPrePublishPanel>
		<p>Pre Publish Panel</p>
	</PluginPrePublishPanel>
);

registerPlugin( 'pre-publish-panel-test', {
	render: PluginPrePublishPanelTest,
} );
```

## Location

![Prepublish panel](https://raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-pre-publish-panel.png?raw=true)
