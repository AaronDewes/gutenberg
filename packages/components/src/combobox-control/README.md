# ComboboxControl

`ComboboxControl` is an enhanced version of a [`SelectControl`](/packages/components/src/select-control/README.md), with the addition of being able to search for options using a search input.

## Table of contents

1. [Design guidelines](#design-guidelines)
2. [Development guidelines](#development-guidelines)
3. [Related components](#related-components)

## Design guidelines

These are the same as [the ones for `SelectControl`s](/packages/components/src/select-control/README.md#design-guidelines), but this component is better suited for when there are too many items to scroll through or load at once so you need to filter them based on user input.

## Development guidelines

### Usage

```jsx
/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@aarondewes/wp-components';
import { useState } from '@aarondewes/wp-compose';

const options = [
	{
		value: 'small',
		label: 'Small',
	},
	{
		value: 'normal',
		label: 'Normal',
	},
	{
		value: 'large',
		label: 'Large',
	},
	{
		value: 'huge',
		label: 'Huge',
	},
];

function MyComboboxControl() {
	const [ fontSize, setFontSize ] = useState();
	const [ filteredOptions, setFilteredOptions ] = useState( options );
	return (
		<ComboboxControl
			label="Font Size"
			value={ fontSize }
			onChange={ setFontSize }
			options={ filteredOptions }
			onInputChange={ ( inputValue ) =>
				setFilteredOptions(
					options.filter( ( option ) =>
						option.label
							.toLowerCase()
							.startsWith( inputValue.toLowerCase() )
					)
				)
			}
		/>
	);
}
```

### Props

#### label

The label for the control.

-   Type: `String`
-   Required: Yes

#### hideLabelFromVision

If true, the label will only be visible to screen readers.

-   Type: `Boolean`
-   Required: No

#### help

If this property is added, a help text will be generated using help property as the content.

-   Type: `String`
-   Required: No

#### options

The options that can be chosen from.

-   Type: `Array<{ value: String, label: String }>`
-   Required: Yes

#### onFilterValueChange

Function called with the control's search input value changes. The argument contains the next input value.

-   Type: `Function`
-   Required: No

#### onChange

Function called with the selected value changes.

-   Type: `Function`
-   Required: No

#### value

The current value of the input.

-   Type: `mixed`
-   Required: Yes

## Related components

-   Like this component, but without a search input, the `CustomSelectControl` component.

-   To select one option from a set, when you want to show all the available options at once, use the `Radio` component.
-   To select one or more items from a set, use the `CheckboxControl` component.
-   To toggle a single setting on or off, use the `ToggleControl` component.
