/**
 * WordPress dependencies
 */
import { subscribe, select, dispatch } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';
import { store as blocksStore } from '@aarondewes/wp-blocks';

export default function registerLegacyWidgetVariations( settings ) {
	const unsubscribe = subscribe( () => {
		const hiddenIds =
			settings?.widgetTypesToHideFromLegacyWidgetBlock ?? [];
		const widgetTypes = select( coreStore )
			.getWidgetTypes( { per_page: -1 } )
			?.filter( ( widgetType ) => ! hiddenIds.includes( widgetType.id ) );
		if ( widgetTypes ) {
			unsubscribe();
			dispatch( blocksStore ).addBlockVariations(
				'core/legacy-widget',
				widgetTypes.map( ( widgetType ) => ( {
					name: widgetType.id,
					title: widgetType.name,
					description: widgetType.description,
					attributes: widgetType.is_multi
						? {
								idBase: widgetType.id,
								instance: {},
						  }
						: {
								id: widgetType.id,
						  },
				} ) )
			);
		}
	} );
}
