module.exports = {
	...require( '@aarondewes/wp-scripts/config/jest-e2e.config' ),
	setupFiles: [ '<rootDir>/config/gutenberg-phase.js' ],
	setupFilesAfterEnv: [
		'<rootDir>/config/setup-test-framework.js',
		'@aarondewes/wp-jest-console',
		'@aarondewes/wp-jest-puppeteer-axe',
		'expect-puppeteer',
		'puppeteer-testing-library/extend-expect',
	],
	testPathIgnorePatterns: [
		'/node_modules/',
		'e2e-tests/specs/performance/',
	],
};
