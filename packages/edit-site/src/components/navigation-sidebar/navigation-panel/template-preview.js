/**
 * WordPress dependencies
 */
import { parse } from '@aarondewes/wp-blocks';
import { BlockPreview, BlockContextProvider } from '@aarondewes/wp-block-editor';
import { useMemo } from '@aarondewes/wp-element';

export default function TemplatePreview( { rawContent, blockContext } ) {
	const blocks = useMemo( () => ( rawContent ? parse( rawContent ) : [] ), [
		rawContent,
	] );

	if ( ! blocks || blocks.length === 0 ) {
		return null;
	}

	if ( blockContext ) {
		return (
			<div className="edit-site-navigation-panel__preview">
				<BlockContextProvider value={ blockContext }>
					<BlockPreview blocks={ blocks } viewportWidth={ 1200 } />
				</BlockContextProvider>
			</div>
		);
	}

	return (
		<div className="edit-site-navigation-panel__preview">
			<BlockPreview blocks={ blocks } viewportWidth={ 1200 } />
		</div>
	);
}
