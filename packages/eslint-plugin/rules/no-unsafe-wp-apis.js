/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	type: 'problem',
	meta: {
		schema: [
			{
				type: 'object',
				additionalProperties: false,
				patternProperties: {
					'^@wordpress\\/[a-zA-Z0-9_-]+$': {
						type: 'array',
						uniqueItems: true,
						minItems: 1,
						items: {
							type: 'string',
							pattern: '^(?:__experimental|__unstable)',
						},
					},
				},
			},
		],
	},
	create( context ) {
		/** @type {AllowedImportsMap} */
		const allowedImports =
			( context.options &&
				typeof context.options[ 0 ] === 'object' &&
				context.options[ 0 ] ) ||
			{};
		const reporter = makeListener( { allowedImports, context } );

		return { ImportDeclaration: reporter };
	},
};

/**
 * @param {Object} _
 * @param {AllowedImportsMap} _.allowedImports
 * @param {import('eslint').Rule.RuleContext} _.context
 *
 * @return {(node: Node) => void} Listener function
 */
function makeListener( { allowedImports, context } ) {
	return function reporter( node ) {
		if ( node.type !== 'ImportDeclaration' ) {
			return;
		}
		if ( typeof node.source.value !== 'string' ) {
			return;
		}

		const sourceModule = node.source.value.trim();

		// Ignore non-WordPress packages
		if ( ! sourceModule.startsWith( '@aarondewes/wp-' ) ) {
			return;
		}

		const allowedImportNames = allowedImports[ sourceModule ] || [];

		node.specifiers.forEach( ( specifierNode ) => {
			if ( specifierNode.type !== 'ImportSpecifier' ) {
				return;
			}

			const importedName = specifierNode.imported.name;

			if (
				! importedName.startsWith( '__unstable' ) &&
				! importedName.startsWith( '__experimental' )
			) {
				return;
			}

			if ( allowedImportNames.includes( importedName ) ) {
				return;
			}

			context.report( {
				message: `Usage of \`${ importedName }\` from \`${ sourceModule }\` is not allowed.\nSee https://developer.wordpress.org/block-editor/contributors/develop/coding-guidelines/#experimental-and-unstable-apis for details.`,
				node: specifierNode,
			} );
		} );
	};
}

/** @typedef {import('estree').Node} Node */
/** @typedef {Record<string, string[]|undefined>} AllowedImportsMap */
