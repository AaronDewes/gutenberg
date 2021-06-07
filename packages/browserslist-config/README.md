# Browserslist Config

[WordPress Browserslist](https://make.wordpress.org/core/handbook/best-practices/browser-support/) shareable config for [Browserslist](https://www.npmjs.com/package/browserslist).

## Installation

Install the module

```shell
$ npm install browserslist @aarondewes/browserslist-config-wp --save-dev
```

**Note**: This package requires Node.js 12.0.0 or later. It is not compatible with older versions.

## Usage

Add this to your `package.json` file:

```json
"browserslist": [
	"extends @aarondewes/browserslist-config-wp"
]
```

Alternatively, add this to `.browserslistrc` file:

```
extends @aarondewes/browserslist-config-wp
```

This package when imported returns an array of supported browsers, for more configuration examples including Autoprefixer, Babel, ESLint, PostCSS, and stylelint see the [Browserslist examples](https://github.com/ai/browserslist-example#browserslist-example) repo.

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
