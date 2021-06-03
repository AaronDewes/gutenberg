/**
 * WordPress dependencies
 */
import { Spinner, SelectControl } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { useSelect } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';
import { store as blockEditorStore } from '@aarondewes/wp-block-editor';

export default function WidgetTypeSelector( { selectedId, onSelect } ) {
	const widgetTypes = useSelect( ( select ) => {
		const hiddenIds =
			select( blockEditorStore ).getSettings()
				?.widgetTypesToHideFromLegacyWidgetBlock ?? [];
		return select( coreStore )
			.getWidgetTypes( { per_page: -1 } )
			?.filter( ( widgetType ) => ! hiddenIds.includes( widgetType.id ) );
	}, [] );

	if ( ! widgetTypes ) {
		return <Spinner />;
	}

	if ( widgetTypes.length === 0 ) {
		return __( 'There are no widgets available.' );
	}

	return (
		<SelectControl
			label={ __( 'Select a legacy widget to display:' ) }
			value={ selectedId ?? '' }
			options={ [
				{ value: '', label: __( 'Select widget' ) },
				...widgetTypes.map( ( widgetType ) => ( {
					value: widgetType.id,
					label: widgetType.name,
				} ) ),
			] }
			onChange={ ( value ) => {
				if ( value ) {
					const selected = widgetTypes.find(
						( widgetType ) => widgetType.id === value
					);
					onSelect( {
						selectedId: selected.id,
						isMulti: selected.is_multi,
					} );
				} else {
					onSelect( { selectedId: null } );
				}
			} }
		/>
	);
}
