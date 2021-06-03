module.exports = {
	...require( '@aarondewes/wp-scripts/config/jest-e2e.config' ),
	testMatch: [ '**/performance/*.test.js' ],
	setupFiles: [ '<rootDir>/config/gutenberg-phase.js' ],
	setupFilesAfterEnv: [
		'<rootDir>/config/setup-performance-test.js',
		'@aarondewes/wp-jest-console',
		'@aarondewes/wp-jest-puppeteer-axe',
		'expect-puppeteer',
	],
	transformIgnorePatterns: [
		'node_modules',
		'scripts/config/puppeteer.config.js',
	],
	reporters: [ 'default', '<rootDir>/config/performance-reporter.js' ],
};
