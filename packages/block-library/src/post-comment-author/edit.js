/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useSelect } from '@aarondewes/wp-data';
import { useBlockProps } from '@aarondewes/wp-block-editor';
import { store as coreStore } from '@aarondewes/wp-core-data';

export default function Edit( { attributes, context } ) {
	const { className } = attributes;
	const { commentId } = context;

	const displayName = useSelect( ( select ) => {
		const { getEntityRecord } = select( coreStore );

		const comment = getEntityRecord( 'root', 'comment', commentId );
		const authorName = comment?.author_name; // eslint-disable-line camelcase

		if ( comment && ! authorName ) {
			const user = getEntityRecord( 'root', 'user', comment.author );
			return user?.name ?? __( 'Anonymous' );
		}

		return authorName ?? '';
	} );

	return (
		<div { ...useBlockProps() }>
			<p className={ className }>{ displayName }</p>
		</div>
	);
}
