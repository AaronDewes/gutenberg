/** @typedef {import('prettier').Options} PrettierOptions */

// Disable reason: The current JSDoc tooling does not yet understand TypeScript
// union types.

/** @type {PrettierOptions} */
const config = {
	useTabs: true,
	tabWidth: 4,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'es5',
	jsxBracketSameLine: false,
	semi: true,
	arrowParens: 'always',
};

module.exports = config;
