# stylelint config

[stylelint](https://stylelint.io/) configuration rules to ensure your CSS is compliant with the [WordPress CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).

## Installation

```bash
$ npm install @aarondewes/wp-stylelint-config --save-dev
```

**Note**: This package requires Node.js 12.0.0 or later. It is not compatible with older versions.

## Usage

If you've installed `@aarondewes/wp-stylelint-config` locally within your project, just set your `stylelint` config to:

```json
{
	"extends": "@aarondewes/wp-stylelint-config"
}
```

If you've globally installed `@aarondewes/wp-stylelint-config` using the `-g` flag, then you'll need to use the absolute path to `@aarondewes/wp-stylelint-config` in your config:

```json
{
	"extends": "/absolute/path/to/@aarondewes/wp-stylelint-config"
}
```

## Presets

In addition to the default preset, there is also a SCSS preset. This preset extends both `@aarondewes/wp-stylelint-config` and [`stylelint-config-recommended-scss`](https://github.com/kristerkari/stylelint-config-recommended-scss).

### SCSS

```json
{
	"extends": [ "@aarondewes/wp-stylelint-config/scss" ]
}
```

## Extending the config

Simply add a `"rules"` key to your config and add your overrides there.

For example, to change the `indentation` to four spaces and turn off the `number-leading-zero` rule:

```json
{
	"extends": "@aarondewes/wp-stylelint-config",
	"rules": {
		"indentation": 4,
		"number-leading-zero": null
	}
}
```

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
