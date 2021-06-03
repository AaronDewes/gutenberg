# PluginPostPublishPanel

This slot allows for injecting items into the bottom of the post-publish panel that appears after a post is published.

## Example

```js
import { registerPlugin } from '@aarondewes/wp-plugins';
import { PluginPostPublishPanel } from '@aarondewes/wp-edit-post';

const PluginPostPublishPanelTest = () => (
	<PluginPostPublishPanel>
		<p>Post Publish Panel</p>
	</PluginPostPublishPanel>
);

registerPlugin( 'post-publish-panel-test', {
	render: PluginPostPublishPanelTest,
} );
```

## Location

![post publish panel](https://raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-post-publish-panel.png?raw=true)
