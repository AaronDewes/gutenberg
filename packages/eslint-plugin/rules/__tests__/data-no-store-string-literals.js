/**
 * External dependencies
 */
import { RuleTester } from 'eslint';

/**
 * Internal dependencies
 */
import rule from '../data-no-store-string-literals';

const ruleTester = new RuleTester( {
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 6,
	},
} );

const valid = [
	// Callback functions
	`import { createRegistrySelector } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; createRegistrySelector(( select ) => { select(store); });`,
	`import { useSelect } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; useSelect(( select ) => { select(store); });`,
	`import { withSelect } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; withSelect(( select ) => { select(store); });`,
	`import { withDispatch } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; withDispatch(( select ) => { select(store); });`,
	`import { withDispatch as withDispatchAlias } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; withDispatchAlias(( select ) => { select(store); });`,

	// Direct function calls
	`import { useDispatch } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; useDispatch( store );`,
	`import { dispatch } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; dispatch( store );`,
	`import { select } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; select( store );`,
	`import { resolveSelect } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; resolveSelect( store );`,
	`import { resolveSelect as resolveSelectAlias } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; resolveSelectAlias( store );`,

	// Object property function calls
	`import { controls } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; controls.select( store );`,
	`import { controls } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; controls.dispatch( store );`,
	`import { controls } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; controls.resolveSelect( store );`,
	`import { controls as controlsAlias } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; controlsAlias.resolveSelect( store );`,
];

const createSuggestionTestCase = ( code, output ) => ( {
	code,
	errors: [
		{
			suggestions: [
				{
					desc:
						'Replace literal with store definition. Import store if neccessary.',
					output,
				},
			],
		},
	],
} );

const invalid = [
	// Callback functions
	`import { createRegistrySelector } from '@aarondewes/wp-data'; createRegistrySelector(( select ) => { select( 'core' ); });`,
	`import { useSelect } from '@aarondewes/wp-data'; useSelect(( select ) => { select( 'core' ); });`,
	`import { withSelect } from '@aarondewes/wp-data'; withSelect(( select ) => { select( 'core' ); });`,
	`import { withDispatch } from '@aarondewes/wp-data'; withDispatch(( select ) => { select( 'core' ); });`,
	`import { withDispatch as withDispatchAlias } from '@aarondewes/wp-data'; withDispatchAlias(( select ) => { select( 'core' ); });`,

	// Direct function calls
	`import { useDispatch } from '@aarondewes/wp-data'; useDispatch( 'core' );`,
	`import { dispatch } from '@aarondewes/wp-data'; dispatch( 'core' );`,
	`import { select } from '@aarondewes/wp-data'; select( 'core' );`,
	`import { resolveSelect } from '@aarondewes/wp-data'; resolveSelect( 'core' );`,
	`import { resolveSelect as resolveSelectAlias } from '@aarondewes/wp-data'; resolveSelectAlias( 'core' );`,

	// Object property function calls
	`import { controls } from '@aarondewes/wp-data'; controls.select( 'core' );`,
	`import { controls } from '@aarondewes/wp-data'; controls.dispatch( 'core' );`,
	`import { controls } from '@aarondewes/wp-data'; controls.resolveSelect( 'core' );`,
	`import { controls as controlsAlias } from '@aarondewes/wp-data'; controlsAlias.resolveSelect( 'core' );`,

	// Direct function calls suggestions
	// Replace core with coreStore and import coreStore
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; select( 'core' );`,
		`import { select } from '@aarondewes/wp-data';\nimport { store as coreStore } from '@aarondewes/wp-core-data'; select( coreStore );`
	),
	// Replace core with coreStore. A @aarondewes/wp-core-data already exists, so it should append the import to that one.
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; import { something } from '@aarondewes/wp-core-data'; select( 'core' );`,
		`import { select } from '@aarondewes/wp-data'; import { something,store as coreStore } from '@aarondewes/wp-core-data'; select( coreStore );`
	),
	// Replace core with coreStore. A @aarondewes/wp-core-data already exists, so it should append the import to that one.
	// This time there is a comma after the import.
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; import { something, } from '@aarondewes/wp-core-data'; select( 'core' );`,
		`import { select } from '@aarondewes/wp-data'; import { something,store as coreStore, } from '@aarondewes/wp-core-data'; select( coreStore );`
	),
	// Replace core with coreStore. Store import already exists. It shouldn't modify the import, just replace the literal with the store definition.
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; select( 'core' );`,
		`import { select } from '@aarondewes/wp-data'; import { store as coreStore } from '@aarondewes/wp-core-data'; select( coreStore );`
	),
	// Replace core with coreStore. There are internal and WordPress dependencies.
	// It should append the import after the last WordPress dependency import.
	createSuggestionTestCase(
		`import { a } from './a'; import { select } from '@aarondewes/wp-data'; import { b } from './b'; select( 'core' );`,
		`import { a } from './a'; import { select } from '@aarondewes/wp-data';\nimport { store as coreStore } from '@aarondewes/wp-core-data'; import { b } from './b'; select( coreStore );`
	),
	// Replace block-editor with blockEditorStore
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; select( 'core/block-editor' );`,
		`import { select } from '@aarondewes/wp-data';\nimport { store as blockEditorStore } from '@aarondewes/wp-block-editor'; select( blockEditorStore );`
	),
	// Replace notices with noticesStore
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; select( 'core/notices' );`,
		`import { select } from '@aarondewes/wp-data';\nimport { store as noticesStore } from '@aarondewes/wp-notices'; select( noticesStore );`
	),
	// Replace edit-post with editPostStore
	createSuggestionTestCase(
		`import { select } from '@aarondewes/wp-data'; select( 'core/edit-post' );`,
		`import { select } from '@aarondewes/wp-data';\nimport { store as editPostStore } from '@aarondewes/wp-edit-post'; select( editPostStore );`
	),
];
const errors = [
	{
		message: `Do not use string literals ( 'core' ) for accessing @aarondewes/wp-data stores. Pass the store definition instead`,
	},
];

ruleTester.run( 'data-no-store-string-literals', rule, {
	valid: valid.map( ( code ) => ( { code } ) ),
	invalid: invalid.map( ( code ) =>
		typeof code === 'string' ? { code, errors } : code
	),
} );
