/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@aarondewes/wp-data';
import { __experimentalNavigationItem as NavigationItem } from '@aarondewes/wp-components';
import { getPathAndQueryString } from '@aarondewes/wp-url';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';

const getEntityTitle = ( kind, entity ) =>
	'taxonomy' === kind ? entity.name : entity?.title?.rendered;

export default function NavigationEntityItems( { kind, name, query = {} } ) {
	const entities = useSelect(
		( select ) => select( coreStore ).getEntityRecords( kind, name, query ),
		[ kind, name, query ]
	);

	const { setPage } = useDispatch( editSiteStore );

	if ( ! entities ) {
		return null;
	}

	const onActivateItem = ( { type, slug, link, id } ) => {
		setPage( {
			type,
			slug,
			path: getPathAndQueryString( link ),
			context: {
				postType: type,
				postId: id,
			},
		} );
	};

	return entities.map( ( entity ) => {
		const key = `content-${ getPathAndQueryString( entity.link ) }`;

		return (
			<NavigationItem
				key={ key }
				item={ key }
				title={ getEntityTitle( kind, entity ) }
				onClick={ () => onActivateItem( entity ) }
			/>
		);
	} );
}
