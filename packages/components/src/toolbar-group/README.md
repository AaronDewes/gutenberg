# ToolbarGroup

A ToolbarGroup can be used to create subgroups of controls inside a [Toolbar](/packages/components/src/toolbar/README.md).

## Usage

```jsx
import { Toolbar, ToolbarGroup, ToolbarButton } from '@aarondewes/wp-components';
import { paragraph, formatBold, formatItalic, link } from '@aarondewes/wp-icons';

function MyToolbar() {
	return (
		<Toolbar label="Options">
			<ToolbarGroup>
				<ToolbarButton icon={ paragraph } label="Paragraph" />
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton icon={ formatBold } label="Bold" />
				<ToolbarButton icon={ formatItalic } label="Italic" />
				<ToolbarButton icon={ link } label="Link" />
			</ToolbarGroup>
		</Toolbar>
	);
}
```

### Props

ToolbarGroup will pass all HTML props to the underlying element.

## Related components

-   ToolbarGroup may contain [ToolbarButton](/packages/components/src/toolbar-button/README.md) and [ToolbarItem](/packages/components/src/toolbar-Item/README.md) as children.
