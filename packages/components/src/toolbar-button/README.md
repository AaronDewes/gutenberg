# ToolbarButton

ToolbarButton can be used to add actions to a toolbar, usually inside a [Toolbar](/packages/components/src/toolbar/README.md) or [ToolbarGroup](/packages/components/src/toolbar-group/README.md) when used to create general interfaces. If you're using it to add controls to your custom block, you should consider using [BlockControls](/docs/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar.md).

It has similar features to the [Button](/packages/components/src/button/README.md) component. Using `ToolbarButton` will ensure the correct styling for a button in a toolbar, and also that keyboard interactions in a toolbar are consistent with the [WAI-ARIA toolbar pattern](https://www.w3.org/TR/wai-aria-practices/#toolbar).

## Usage

To create general interfaces, you'll want to render ToolbarButton in a [Toolbar](/packages/components/src/toolbar/README.md) component.

```jsx
import { Toolbar, ToolbarButton } from '@aarondewes/wp-components';
import { edit } from '@aarondewes/wp-icons';

function MyToolbar() {
	return (
		<Toolbar label="Options">
			<ToolbarButton
				icon={ edit }
				label="Edit"
				onClick={ () => alert( 'Editing' ) }
			/>
		</Toolbar>
	);
}
```

### Inside BlockControls

If you're working on a custom block and you want to add controls to the block toolbar, you should use [BlockControls](/docs/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar.md) instead. Optionally wrapping it with [ToolbarGroup](/packages/components/src/toolbar-group/README.md).

```jsx
import { BlockControls } from '@aarondewes/wp-block-editor';
import { ToolbarGroup, ToolbarButton } from '@aarondewes/wp-components';
import { edit } from '@aarondewes/wp-icons';

function Edit() {
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ edit }
					label="Edit"
					onClick={ () => alert( 'Editing' ) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
```

## Props

This component accepts [the same API of the Button](/packages/components/src/button/README.md#props) component.

## Related components

-   If you wish to implement a control to select options grouped as icon buttons you can use the [Toolbar](/packages/components/src/toolbar/README.md) component, which already handles this strategy.
-   The ToolbarButton may be used with other elements such as [Dropdown](/packages/components/src/dropdown/README.md) to display options in a popover.
