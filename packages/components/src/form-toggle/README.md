# FormToggle

FormToggle switches a single setting on or off.

![On and off FormToggles. The top toggle is on, while the bottom toggle is off.](https://wordpress.org/gutenberg/files/2019/01/Toggle.jpg)

## Table of contents

1. [Design guidelines](#design-guidelines)
2. [Development guidelines](#development-guidelines)
3. [Related components](#related-components)

## Design guidelines

### Usage

#### When to use toggles

Use toggles when you want users to:

-   Switch a single option on or off.
-   Immediately activate or deactivate something.

![FormToggle used for a “fixed background” setting](https://wordpress.org/gutenberg/files/2019/01/Toggle-Do.jpg)

**Do**
Use toggles to switch an option on or off.

![Radio used for a “fixed background” setting](https://wordpress.org/gutenberg/files/2019/01/Toggle-Dont.jpg)

**Don’t**
Don’t use radio buttons for settings that toggle on and off.

Toggles are preferred when the user is not expecting to submit data, as is the case with checkboxes and radio buttons.

#### State

When the user slides a toggle thumb (1) to the other side of the track (2) and the state of the toggle changes, it’s been successfully toggled.

![Diagram showing FormToggle states](https://wordpress.org/gutenberg/files/2019/01/Toggle-Diagram.jpg)

#### Text label

Toggles should have clear inline labels so users know exactly what option the toggle controls, and whether the option is enabled or disabled.

Do not include any text (e.g. “on” or “off”) within the toggle element itself. The toggle alone should be sufficient to communicate the state.

### Behavior

When a user switches a toggle, its corresponding action takes effect immediately.

## Development guidelines

### Usage

```jsx
import { FormToggle } from '@aarondewes/wp-components';
import { withState } from '@aarondewes/wp-compose';

const MyFormToggle = withState( {
	checked: true,
} )( ( { checked, setState } ) => (
	<FormToggle
		checked={ checked }
		onChange={ () =>
			setState( ( state ) => ( { checked: ! state.checked } ) )
		}
	/>
) );
```

### Props

The component accepts the following props:

#### checked

If checked is true the toggle will be checked. If checked is false the toggle will be unchecked.
If no value is passed the toggle will be unchecked.

-   Type: `Boolean`
-   Required: No

#### disabled

If disabled is true the toggle will be disabled and apply the appropriate styles.

-   Type: `Boolean`
-   Required: No

#### onChange

A function that receives the checked state (boolean) as input.

-   Type: `function`
-   Required: Yes

## Related components

-   To select one option from a set, and you want to show them all the available options at once, use the `Radio` component.
-   To select one or more items from a set, use the `CheckboxControl` component.
-   To display a toggle with label and help text, use the `ToggleControl` component.
