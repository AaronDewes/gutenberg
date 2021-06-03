# PluginMoreMenuItem

This slot will add a new item to the More Tools & Options section.

## Example

```js
import { registerPlugin } from '@aarondewes/wp-plugins';
import { PluginMoreMenuItem } from '@aarondewes/wp-edit-post';
import { image } from '@aarondewes/wp-icons';

const MyButtonMoreMenuItemTest = () => (
	<PluginMoreMenuItem
		icon={ image }
		onClick={ () => {
			alert( 'Button Clicked' );
		} }
	>
		More Menu Item
	</PluginMoreMenuItem>
);

registerPlugin( 'more-menu-item-test', { render: MyButtonMoreMenuItemTest } );
```

## Location

![Location](https://raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-more-menu-item.png?raw=true)
