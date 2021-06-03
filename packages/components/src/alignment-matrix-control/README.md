# AlignmentMatrixControl

AlignmentMatrixControl components enable adjustments to horizontal and vertical alignments for UI.

## Usage

```jsx
import { AlignmentMatrixControl } from '@aarondewes/wp-components';
import { useState } from '@aarondewes/wp-element';

const Example = () => {
	const [ alignment, setAlignment ] = useState( 'center center' );

	return (
		<AlignmentMatrixControl value={ alignment } onChange={ setAlignment } />
	);
};
```
