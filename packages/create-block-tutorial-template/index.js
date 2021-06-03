/**
 * External dependencies
 */
const { join } = require( 'path' );

module.exports = {
	defaultValues: {
		slug: 'gutenpride',
		namespace: 'create-block-tutorial',
		category: 'text',
		title: 'Gutenpride',
		description:
			'A Gutenberg block to show your pride! This block enables you to type text and style it with the color font Gilbert from Type with Pride.',
		dashicon: 'flag',
		attributes: {
			message: {
				type: 'string',
				source: 'text',
				selector: 'div',
			},
		},
		supports: {
			html: false,
		},
		npmDependencies: [
			'@aarondewes/wp-block-editor',
			'@aarondewes/wp-blocks',
			'@aarondewes/wp-components',
			'@aarondewes/wp-i18n',
		],
	},
	templatesPath: join( __dirname, 'templates' ),
	assetsPath: join( __dirname, 'assets' ),
};
