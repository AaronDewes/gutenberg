/**
 * WordPress dependencies
 */
import { getPathAndQueryString } from '@aarondewes/wp-url';
import { useMemo } from '@aarondewes/wp-element';
import { useSelect } from '@aarondewes/wp-data';
import { Button } from '@aarondewes/wp-components';
import { edit } from '@aarondewes/wp-icons';
import { __ } from '@aarondewes/wp-i18n';
import { store as coreStore } from '@aarondewes/wp-core-data';

export default function NavigateToLink( {
	type,
	id,
	activePage,
	onActivePageChange,
} ) {
	const post = useSelect(
		( select ) =>
			type &&
			id &&
			type !== 'URL' &&
			select( coreStore ).getEntityRecord( 'postType', type, id ),
		[ type, id ]
	);

	const onClick = useMemo( () => {
		if ( ! post?.link ) return null;
		const path = getPathAndQueryString( post.link );
		if ( path === activePage?.path ) return null;
		return () =>
			onActivePageChange( {
				type,
				slug: post.slug,
				path,
				context: {
					postType: post.type,
					postId: post.id,
				},
			} );
	}, [ post, activePage?.path, onActivePageChange ] );

	return (
		onClick && (
			<Button
				icon={ edit }
				label={ __( 'Edit Page Template' ) }
				onClick={ onClick }
			/>
		)
	);
}
