# ToolbarDropdownMenu

ToolbarDropdownMenu can be used to add actions to a toolbar, usually inside a [Toolbar](/packages/components/src/toolbar/README.md) or [ToolbarGroup](/packages/components/src/toolbar-group/README.md) when used to create general interfaces. If you're using it to add controls to your custom block, you should consider using [BlockControls](/docs/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar.md).

It has similar features to the [DropdownMenu](/packages/components/src/dropdown-menu/README.md) component. Using `ToolbarDropdownMenu` will ensure that keyboard interactions in a toolbar are consistent with the [WAI-ARIA toolbar pattern](https://www.w3.org/TR/wai-aria-practices/#toolbar).

## Usage

To create general interfaces, you'll want to render ToolbarButton in a [Toolbar](/packages/components/src/toolbar/README.md) component.

```jsx
import { Toolbar, ToolbarDropdownMenu } from '@aarondewes/wp-components';
import {
	more,
	arrowLeft,
	arrowRight,
	arrowUp,
	arrowDown,
} from '@aarondewes/wp-icons';

function MyToolbar() {
	return (
		<Toolbar label="Options">
			<ToolbarDropdownMenu
				icon={ more }
				label="Select a direction"
				controls={ [
					{
						title: 'Up',
						icon: arrowUp,
						onClick: () => console.log( 'up' ),
					},
					{
						title: 'Right',
						icon: arrowRight,
						onClick: () => console.log( 'right' ),
					},
					{
						title: 'Down',
						icon: arrowDown,
						onClick: () => console.log( 'down' ),
					},
					{
						title: 'Left',
						icon: arrowLeft,
						onClick: () => console.log( 'left' ),
					},
				] }
			/>
		</Toolbar>
	);
}
```

### Inside BlockControls

If you're working on a custom block and you want to add controls to the block toolbar, you should use [BlockControls](/docs/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar.md) instead.

```jsx
import { BlockControls } from '@aarondewes/wp-block-editor';
import { Toolbar, ToolbarDropdownMenu } from '@aarondewes/wp-components';
import {
	more,
	arrowLeft,
	arrowRight,
	arrowUp,
	arrowDown,
} from '@aarondewes/wp-icons';

function Edit() {
	return (
		<BlockControls group="block">
			<ToolbarDropdownMenu
				icon={ more }
				label="Select a direction"
				controls={ [
					{
						title: 'Up',
						icon: arrowUp,
						onClick: () => console.log( 'up' ),
					},
					{
						title: 'Right',
						icon: arrowRight,
						onClick: () => console.log( 'right' ),
					},
					{
						title: 'Down',
						icon: arrowDown,
						onClick: () => console.log( 'down' ),
					},
					{
						title: 'Left',
						icon: arrowLeft,
						onClick: () => console.log( 'left' ),
					},
				] }
			/>
		</BlockControls>
	);
}
```

## Props

This component accepts [the same API of the DropdownMenu](/packages/components/src/dropdown-menu/README.md#props) component.
