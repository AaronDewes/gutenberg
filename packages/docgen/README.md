# `docgen`

`docgen` helps you to generate the _public API_ of your code. Given an entry point file, it outputs the ES6 export statements and their corresponding JSDoc comments in human-readable format. It also supports TypeScript via the TypeScript babel plugin.

Some characteristics:

-   If the export statement doesn't contain any JSDoc, it'll look up for JSDoc up to the declaration.
-   It can resolve relative dependencies, either files or directories. For example, `import default from './dependency'` will find `dependency.js` or `dependency/index.js`
-   For TypeScript support, all types must be explicity annotated as the TypeScript Babel plugin is unable to consume inferred types (it does not run the TS compiler, after all—it merely parses TypeScript). For example, all function return types must be explicitly annotated if they are to be documented by `docgen`.

## Installation

Install the module

```bash
npm install @aarondewes/wp-docgen --save-dev
```

## Usage

```bash
npx docgen <entry-point.js>
```

This command will generate a file named `entry-point-api.md` containing all the exports and their JSDoc comments.

### CLI options

-   **--formatter** `(String)`: A path to a custom formatter to control the contents of the output file. It should be a CommonJS module that exports a function that takes as input:
    -   _rootDir_ `(String)`: current working directory as seen by docgen.
    -   _docPath_ `(String)`: path of the output document to generate.
    -   _symbols_ `(Array)`: the symbols found.
-   **--ignore** `(RegExp)`: A regular expression used to ignore symbols whose name match it.
-   **--output** `(String)`: Output file that will contain the API documentation.
-   **--to-section** `(String)`: Append generated documentation to this section in the Markdown output. To be used by the default Markdown formatter. Depends on `--output` and bypasses the custom `--formatter` passed, if any.
-   **--to-token**: Embed generated documentation within the start and end tokens in the Markdown output. To be used by the default Markdown formatter.Depends on `--output` and bypasses the custom `--formatter` passed, if any.
    -   Start token: <code>&lt;!-- START TOKEN(Autogenerated API docs) --&gt;</code>
    -   End token: <code>&lt;!-- END TOKEN(Autogenerated API docs) --&gt;</code>
-   **--use-token** `(String)`: This options allows you to customize the string between the tokens. For example, `--use-token my-api` will look up for the start token <code>&lt;!-- START TOKEN(my-api) --&gt;</code> and the end token <code>&lt;!-- END TOKEN(my-api) --&gt;</code>. Depends on `--to-token`.
-   **--debug**: Run in debug mode, which outputs some intermediate files useful for debugging.

### Babel Configuration

`@aarondewes/wp-docgen` follows the default [project-wide configuration of Babel](https://babeljs.io/docs/en/next/config-files#project-wide-configuration). Like Babel, it will automatically search for a `babel.config.json` file, or an equivalent one using the [supported extensions](https://babeljs.io/docs/en/next/config-files#supported-file-extensions), in the project root directory.

Without it, `@aarondewes/wp-docgen` runs with the default option. In other words, it cannot parse JSX or other advanced syntaxes.

## Examples

### Default export

Entry point `index.js`:

```js
/**
 * Adds two numbers.
 *
 * @param {number} term1 First number.
 * @param {number} term2 Second number.
 * @return {number} The result of adding the two numbers.
 */
export default function addition( term1, term2 ) {
	// Implementation would go here.
}
```

Output of `npx docgen index.js` would be `index-api.js`:

```markdown
# API

## default

[example.js#L8-L10](example.js#L8-L10)

Adds two numbers.

**Parameters**

-   **term1** `number`: First number.
-   **term2** `number`: Second number.

**Returns**

`number` The result of adding the two numbers.
```

### Named export

Entry point `index.js`:

```js
/**
 * Adds two numbers.
 *
 * @param {number} term1 First number.
 * @param {number} term2 Second number.
 * @return {number} The result of adding the two numbers.
 */
function addition( term1, term2 ) {
	return term1 + term2;
}

/**
 * Adds two numbers.
 *
 * @deprecated Use `addition` instead.
 *
 * @param {number} term1 First number.
 * @param {number} term2 Second number.
 * @return {number} The result of adding the two numbers.
 */
function count( term1, term2 ) {
	return term1 + term2;
}

export { count, addition };
```

Output of `npx docgen index.js` would be `index-api.js`:

```markdown
# API

## addition

[example.js#L25-L25](example.js#L25-L25)

Adds two numbers.

**Parameters**

-   **term1** `number`: First number.
-   **term2** `number`: Second number.

**Returns**

`number` The result of adding the two numbers.

## count

[example.js#L25-L25](example.js#L25-L25)

> **Deprecated** Use `addition` instead.

Adds two numbers.

**Parameters**

-   **term1** `number`: First number.
-   **term2** `number`: Second number.

**Returns**

`number` The result of adding the two numbers.
```

### Namespace export

Let the entry point be `index.js`:

```js
export * from './count';
```

with `./count/index.js` contents being:

````js
/**
 * Substracts two numbers.
 *
 * @example
 *
 * ```js
 * const result = substraction( 5, 2 );
 * console.log( result ); // Will log 3
 * ```
 *
 * @param {number} term1 First number.
 * @param {number} term2 Second number.
 * @return {number} The result of subtracting the two numbers.
 */
export function substraction( term1, term2 ) {
	return term1 - term2;
}

/**
 * Adds two numbers.
 *
 * @example
 *
 * ```js
 * const result = addition( 5, 2 );
 * console.log( result ); // Will log 7
 * ```
 *
 * @param {number} term1 First number.
 * @param {number} term2 Second number.
 * @return {number} The result of adding the two numbers.
 */
export function addition( term1, term2 ) {
	// Implementation would go here.
	return term1 - term2;
}
````

Output of `npx docgen index.js` would be `index-api.js`:

````markdown
# API

## addition

[example-module.js#L1-L1](example-module.js#L1-L1)

Adds two numbers.

**Usage**

```js
const result = addition( 5, 2 );
console.log( result ); // Will log 7
```

**Parameters**

-   **term1** `number`: First number.
-   **term2** `number`: Second number.

**Returns**

`number` The result of adding the two numbers.

## substraction

[example-module.js#L1-L1](example-module.js#L1-L1)

Substracts two numbers.

**Usage**

```js
const result = substraction( 5, 2 );
console.log( result ); // Will log 3
```

**Parameters**

-   **term1** `number`: First number.
-   **term2** `number`: Second number.

**Returns**

`number` The result of subtracting the two numbers.
````

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>

### TypeScript support

Entry point `index.ts`:

```js
/**
 * Adds two numbers.
 *
 * @param term1 First number.
 * @param term2 Second number.
 * @return The result of adding the two numbers.
 */
export default function addition( term1: number, term2: number ): number {
	// Implementation would go here.
}
```

Output of `npx docgen index.ts` would be `index-api.js`:

```markdown
# API

## default

[example.js#L8-L10](example.js#L8-L10)

Adds two numbers.

**Parameters**

-   **term1** `number`: First number.
-   **term2** `number`: Second number.

**Returns**

`number` The result of adding the two numbers.
```
