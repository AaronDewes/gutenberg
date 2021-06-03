module.exports = {
	plugins: [ '@wordpress' ],
	rules: {
		'@aarondewes/wp-no-unused-vars-before-return': 'error',
		'@aarondewes/wp-no-base-control-with-label-without-id': 'error',
		'@aarondewes/wp-no-unguarded-get-range-at': 'error',
		'@aarondewes/wp-no-global-active-element': 'error',
		'@aarondewes/wp-no-global-get-selection': 'error',
		'@aarondewes/wp-no-global-event-listener': 'warn',
		'@aarondewes/wp-no-unsafe-wp-apis': 'error',
	},
	overrides: [
		{
			files: [ '*.native.js' ],
			rules: {
				'@aarondewes/wp-no-base-control-with-label-without-id': 'off',
			},
		},
		{
			files: [
				'*.test.js',
				'**/test/*.js',
				'packages/e2e-test-utils/**/*.js',
			],
			rules: {
				'@aarondewes/wp-no-global-active-element': 'off',
				'@aarondewes/wp-no-global-get-selection': 'off',
				'@aarondewes/wp-no-global-event-listener': 'off',
			},
		},
	],
	settings: {
		react: {
			version: '16.6',
		},
	},
};
