# ColorPicker

Accessible color picker.

_Parts of the source code were derived and modified from [react-color](https://github.com/casesandberg/react-color/), released under the MIT license._

## Usage

```jsx
import { ColorPicker } from '@aarondewes/wp-components';
import { withState } from '@aarondewes/wp-compose';

const MyColorPicker = withState( {
	color: '#f00',
} )( ( { color, setState } ) => {
	return (
		<ColorPicker
			color={ color }
			onChangeComplete={ ( value ) => setState( value.hex ) }
			disableAlpha
		/>
	);
} );
```
