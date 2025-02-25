/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@aarondewes/wp-blocks';
import { useMemo, useCallback } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { SelectControl } from '@aarondewes/wp-components';
import { useSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

export default function DefaultStylePicker( { blockName } ) {
	const {
		preferredStyle,
		onUpdatePreferredStyleVariations,
		styles,
	} = useSelect(
		( select ) => {
			const settings = select( blockEditorStore ).getSettings();
			const preferredStyleVariations =
				settings.__experimentalPreferredStyleVariations;
			return {
				preferredStyle: preferredStyleVariations?.value?.[ blockName ],
				onUpdatePreferredStyleVariations:
					preferredStyleVariations?.onChange ?? null,
				styles: select( blocksStore ).getBlockStyles( blockName ),
			};
		},
		[ blockName ]
	);
	const selectOptions = useMemo(
		() => [
			{ label: __( 'Not set' ), value: '' },
			...styles.map( ( { label, name } ) => ( { label, value: name } ) ),
		],
		[ styles ]
	);
	const selectOnChange = useCallback(
		( blockStyle ) => {
			onUpdatePreferredStyleVariations( blockName, blockStyle );
		},
		[ blockName, onUpdatePreferredStyleVariations ]
	);

	return (
		onUpdatePreferredStyleVariations && (
			<SelectControl
				options={ selectOptions }
				value={ preferredStyle || '' }
				label={ __( 'Default Style' ) }
				onChange={ selectOnChange }
			/>
		)
	);
}
