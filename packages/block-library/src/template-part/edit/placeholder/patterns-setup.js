/**
 * WordPress dependencies
 */
import { __experimentalBlockPatternSetup as BlockPatternSetup } from '@aarondewes/wp-block-editor';
import { useEffect } from '@aarondewes/wp-element';

export default function PatternsSetup( { area, clientId, onCreate } ) {
	const blockNameWithArea = area
		? `core/template-part/${ area }`
		: 'core/template-part';

	return (
		<BlockPatternSetup
			clientId={ clientId }
			startBlankComponent={
				<StartBlankComponent onCreate={ onCreate } />
			}
			onBlockPatternSelect={ onCreate }
			filterPatternsFn={ ( pattern ) =>
				pattern?.blockTypes?.some?.(
					( blockType ) => blockType === blockNameWithArea
				)
			}
		/>
	);
}

function StartBlankComponent( { onCreate } ) {
	useEffect( () => {
		onCreate();
	}, [] );
	return null;
}
