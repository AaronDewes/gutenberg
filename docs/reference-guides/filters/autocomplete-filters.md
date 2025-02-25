# Autocomplete

The `editor.Autocomplete.completers` filter is for extending and overriding the list of autocompleters used by blocks.

The `Autocomplete` component found in `@aarondewes/wp-block-editor` applies this filter. The `@aarondewes/wp-components` package provides the foundational `Autocomplete` component that does not apply such a filter, but blocks should generally use the component provided by `@aarondewes/wp-block-editor`.

### Example

Here is an example of using the `editor.Autocomplete.completers` filter to add an acronym completer. You can find full documentation for the autocompleter interface with the `Autocomplete` component in the `@aarondewes/wp-components` package.

{% codetabs %}
{% ESNext %}

```jsx
// Our completer
const acronymCompleter = {
	name: 'acronyms',
	triggerPrefix: '::',
	options: [
		{ letters: 'FYI', expansion: 'For Your Information' },
		{ letters: 'AFAIK', expansion: 'As Far As I Know' },
		{ letters: 'IIRC', expansion: 'If I Recall Correctly' },
	],
	getOptionKeywords( { letters, expansion } ) {
		const expansionWords = expansion.split( /\s+/ );
		return [ letters, ...expansionWords ];
	},
	getOptionLabel: acronym => acronym.letters,
	getOptionCompletion: ( { letters, expansion } ) => (
		<abbr title={ expansion }>{ letters }</abbr>,
	),
};

// Our filter function
function appendAcronymCompleter( completers, blockName ) {
	return blockName === 'my-plugin/foo' ?
		[ ...completers, acronymCompleter ] :
		completers;
}

// Adding the filter
wp.hooks.addFilter(
	'editor.Autocomplete.completers',
	'my-plugin/autocompleters/acronym',
	appendAcronymCompleter
);
```

{% ES5 %}

```js
// Our completer
var acronymCompleter = {
	name: 'acronyms',
	triggerPrefix: '::',
	options: [
		{ letters: 'FYI', expansion: 'For Your Information' },
		{ letters: 'AFAIK', expansion: 'As Far As I Know' },
		{ letters: 'IIRC', expansion: 'If I Recall Correctly' },
	],
	getOptionKeywords: function ( abbr ) {
		var expansionWords = abbr.expansion.split( /\s+/ );
		return [ abbr.letters ].concat( expansionWords );
	},
	getOptionLabel: function ( acronym ) {
		return acronym.letters;
	},
	getOptionCompletion: function ( abbr ) {
		return wp.element.createElement(
			'abbr',
			{ title: abbr.expansion },
			abbr.letters
		);
	},
};

// Our filter function
function appendAcronymCompleter( completers, blockName ) {
	return blockName === 'my-plugin/foo'
		? completers.concat( acronymCompleter )
		: completers;
}

// Adding the filter
wp.hooks.addFilter(
	'editor.Autocomplete.completers',
	'my-plugin/autocompleters/acronyms',
	appendAcronymCompleter
);
```

{% end %}
