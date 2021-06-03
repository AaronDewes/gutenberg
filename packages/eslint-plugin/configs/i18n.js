module.exports = {
	plugins: [ '@wordpress' ],
	rules: {
		'@aarondewes/wp-valid-sprintf': 'error',
		'@aarondewes/wp-i18n-translator-comments': 'error',
		'@aarondewes/wp-i18n-text-domain': 'error',
		'@aarondewes/wp-i18n-no-collapsible-whitespace': 'error',
		'@aarondewes/wp-i18n-no-placeholders-only': 'error',
		'@aarondewes/wp-i18n-no-variables': 'error',
		'@aarondewes/wp-i18n-ellipsis': 'error',
	},
};
