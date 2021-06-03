/**
 * External dependencies
 */
import { RuleTester } from 'eslint';

/**
 * Internal dependencies
 */
import rule from '../no-unsafe-wp-apis';

const ruleTester = new RuleTester( {
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 6,
	},
} );

const options = [
	{ '@aarondewes/wp-package': [ '__experimentalSafe', '__unstableSafe' ] },
];

ruleTester.run( 'no-unsafe-wp-apis', rule, {
	valid: [
		{ code: "import _ from 'lodash';", options },
		{ code: "import { map } from 'lodash';", options },
		{ code: "import { __experimentalFoo } from 'lodash';", options },
		{ code: "import { __unstableFoo } from 'lodash';", options },
		{ code: "import _, { __unstableFoo } from 'lodash';", options },
		{ code: "import * as _ from 'lodash';", options },

		{ code: "import _ from './x';", options },
		{ code: "import { map } from './x';", options },
		{ code: "import { __experimentalFoo } from './x';", options },
		{ code: "import { __unstableFoo } from './x';", options },
		{ code: "import _, { __unstableFoo } from './x';", options },
		{ code: "import * as _ from './x';", options },

		{ code: "import s from '@aarondewes/wp-package';", options },
		{ code: "import { feature } from '@aarondewes/wp-package';", options },
		{
			code: "import { __experimentalSafe } from '@aarondewes/wp-package';",
			options,
		},
		{
			code: "import { __unstableSafe } from '@aarondewes/wp-package';",
			options,
		},
		{
			code:
				"import { feature, __experimentalSafe } from '@aarondewes/wp-package';",
			options,
		},
		{
			code: "import s, { __experimentalSafe } from '@aarondewes/wp-package';",
			options,
		},
		{ code: "import * as s from '@aarondewes/wp-package';", options },
	],

	invalid: [
		{
			code: "import { __experimentalUnsafe } from '@aarondewes/wp-package';",
			options,
			errors: [
				{
					message: `Usage of \`__experimentalUnsafe\` from \`@aarondewes/wp-package\` is not allowed.
See https://developer.wordpress.org/block-editor/contributors/develop/coding-guidelines/#experimental-and-unstable-apis for details.`,
					type: 'ImportSpecifier',
				},
			],
		},
		{
			code: "import { __experimentalSafe } from '@aarondewes/wp-unsafe';",
			options,
			errors: [
				{
					message: `Usage of \`__experimentalSafe\` from \`@aarondewes/wp-unsafe\` is not allowed.
See https://developer.wordpress.org/block-editor/contributors/develop/coding-guidelines/#experimental-and-unstable-apis for details.`,
					type: 'ImportSpecifier',
				},
			],
		},
		{
			code:
				"import { feature, __experimentalSafe } from '@aarondewes/wp-unsafe';",
			options,
			errors: [
				{
					message: `Usage of \`__experimentalSafe\` from \`@aarondewes/wp-unsafe\` is not allowed.
See https://developer.wordpress.org/block-editor/contributors/develop/coding-guidelines/#experimental-and-unstable-apis for details.`,
					type: 'ImportSpecifier',
				},
			],
		},
		{
			code:
				"import s, { __experimentalUnsafe } from '@aarondewes/wp-package';",
			options,
			errors: [
				{
					message: `Usage of \`__experimentalUnsafe\` from \`@aarondewes/wp-package\` is not allowed.
See https://developer.wordpress.org/block-editor/contributors/develop/coding-guidelines/#experimental-and-unstable-apis for details.`,
					type: 'ImportSpecifier',
				},
			],
		},
		{
			code: "import { __unstableFeature } from '@aarondewes/wp-package';",
			options,
			errors: [
				{
					message: `Usage of \`__unstableFeature\` from \`@aarondewes/wp-package\` is not allowed.
See https://developer.wordpress.org/block-editor/contributors/develop/coding-guidelines/#experimental-and-unstable-apis for details.`,
					type: 'ImportSpecifier',
				},
			],
		},
	],
} );
