/**
 * External dependencies
 */
import { some } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import { PanelBody } from '@aarondewes/wp-components';
import { page, layout } from '@aarondewes/wp-icons';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import EntityRecordItem from './entity-record-item';

const ENTITY_NAME_ICONS = {
	site: layout,
	page,
};

export default function EntityTypeList( {
	list,
	unselectedEntities,
	setUnselectedEntities,
	closePanel,
} ) {
	const firstRecord = list[ 0 ];
	const entity = useSelect(
		( select ) =>
			select( coreStore ).getEntity( firstRecord.kind, firstRecord.name ),
		[ firstRecord.kind, firstRecord.name ]
	);

	// Set icon based on type of entity.
	const { name } = firstRecord;
	const icon = ENTITY_NAME_ICONS[ name ];

	return (
		<PanelBody title={ entity.label } initialOpen={ true } icon={ icon }>
			{ list.map( ( record ) => {
				return (
					<EntityRecordItem
						key={ record.key || record.property }
						record={ record }
						checked={
							! some(
								unselectedEntities,
								( elt ) =>
									elt.kind === record.kind &&
									elt.name === record.name &&
									elt.key === record.key &&
									elt.property === record.property
							)
						}
						onChange={ ( value ) =>
							setUnselectedEntities( record, value )
						}
						closePanel={ closePanel }
					/>
				);
			} ) }
		</PanelBody>
	);
}
