# Prevent unsafe API usage (no-unsafe-wp-apis)

Prevent unsafe APIs from `@aarondewes/wp-*` packages from being imported.

This includes experimental and unstable APIs which are expected to change and likely to cause issues in application code.
See the [documentation](https://github.com/WordPress/gutenberg/blob/HEAD/docs/contributors/code/coding-guidelines.md#experimental-and-unstable-apis).

> **There is no support commitment for experimental and unstable APIs.** They can and will be removed or changed without advance warning, including as part of a minor or patch release. As an external consumer, you should avoid these APIs.
> …
>
> -   An **experimental API** is one which is planned for eventual public availability, but is subject to further experimentation, testing, and discussion.
> -   An **unstable API** is one which serves as a means to an end. It is not desired to ever be converted into a public API.

## Rule details

Examples of **incorrect** code for this rule:

```js
import { __experimentalFeature } from '@aarondewes/wp-foo';
import { __unstableFeature } from '@aarondewes/wp-bar';
```

Examples of **correct** code for this rule:

```js
import { registerBlockType } from '@aarondewes/wp-blocks';
```

## Options

The rule can be configured via an object.
This should be an object where the keys are import package names and the values are arrays of allowed unsafe imports.

#### Example configuration

```json
{
	"@aarondewes/wp-no-unsafe-wp-apis": [
		"error",
		{ "@aarondewes/wp-block-editor": [ "__experimentalBlock" ] }
	]
}
```
