# MenuGroup

`MenuGroup` wraps a series of related `MenuItem` components into a common section.

![MenuGroup Example](https://wordpress.org/gutenberg/files/2019/03/MenuGroup.png)

1. MenuGroup

## Table of Contents

1. [Design guidelines](#design-guidelines)
2. [Development guidelines](#development-guidelines)
3. [Related components](#related-components)

## Design guidelines

### Usage

A `MenuGroup` should be used to indicate that two or more individual MenuItems are related. When other menu items exist above or below a `MenuGroup`, the group should have a divider line between it and the adjacent item. A `MenuGroup` can optionally include a label to describe its contents.

![MenuGroup diagram with label and dividers](https://wordpress.org/gutenberg/files/2019/03/MenuGroup-Anatomy.png)

1. `MenuGroup` label
2. `MenuGroup` dividers

## Development guidelines

### Usage

```jsx
import { MenuGroup, MenuItem } from '@aarondewes/wp-components';

const MyMenuGroup = () => (
	<MenuGroup label="Settings">
		<MenuItem>Setting 1</MenuItem>
		<MenuItem>Setting 2</MenuItem>
	</MenuGroup>
);
```

## Related Components

-   `MenuGroup`s are intended to be used in a `DropDownMenu`.
-   To use a single button in a menu, use `MenuItem`.
-   To allow users to toggle between a set of menu options, use `MenuItemsChoice` inside of a `MenuGroup`.
