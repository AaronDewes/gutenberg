# withFocusReturn

`withFocusReturn` is a higher-order component used typically in scenarios of short-lived elements (modals, dropdowns) where, upon the element's unmounting, focus should be restored to the focused element which had initiated it being rendered.

## Usage

### `withFocusReturn`

```jsx
import { withFocusReturn, TextControl, Button } from '@aarondewes/wp-components';
import { withState } from '@aarondewes/wp-compose';

const EnhancedComponent = withFocusReturn( () => (
	<div>
		Focus will return to the previous input when this component is unmounted
		<TextControl autoFocus={ true } onChange={ () => {} } />
	</div>
) );

const MyComponentWithFocusReturn = withState( {
	text: '',
} )( ( { text, setState } ) => {
	const unmount = () => {
		document.activeElement.blur();
		setState( { text: '' } );
	};

	return (
		<div>
			<TextControl
				placeholder="Type something"
				value={ text }
				onChange={ ( text ) => setState( { text } ) }
			/>
			{ text && <EnhancedComponent /> }
			{ text && (
				<Button variant="secondary" onClick={ unmount }>
					Unmount
				</Button>
			) }
		</div>
	);
} );
```

`withFocusReturn` can optionally be called as a higher-order function creator. Provided an options object, a new higher-order function is returned.

Currently, the following options are supported:

#### `onFocusReturn`

An optional function which allows the developer to customize the focus return behavior. A return value of `false` should be returned from this function to indicate that the default focus return behavior should be skipped.

-   Type: `Function`
-   Required: No

_Example:_

```jsx
function MyComponent() {
	return <textarea />;
}

const EnhancedMyComponent = withFocusReturn( {
	onFocusReturn() {
		document.getElementById( 'other-input' ).focus();
		return false;
	},
} )( MyComponent );
```
