/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	Warning,
	useBlockProps,
} from '@aarondewes/wp-block-editor';
import { useState, useEffect } from '@aarondewes/wp-element';
import apiFetch from '@aarondewes/wp-api-fetch';
import { addQueryArgs } from '@aarondewes/wp-url';
import { __ } from '@aarondewes/wp-i18n';

export default function PostCommentsCountEdit( {
	attributes,
	context,
	setAttributes,
} ) {
	const { textAlign } = attributes;
	const { postId } = context;
	const [ commentsCount, setCommentsCount ] = useState();
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	useEffect( () => {
		if ( ! postId ) {
			return;
		}
		const currentPostId = postId;
		apiFetch( {
			path: addQueryArgs( '/wp/v2/comments', {
				post: postId,
			} ),
			parse: false,
		} ).then( ( res ) => {
			// Stale requests will have the `currentPostId` of an older closure.
			if ( currentPostId === postId ) {
				setCommentsCount( res.headers.get( 'X-WP-Total' ) );
			}
		} );
	}, [ postId ] );

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				{ postId && commentsCount !== undefined ? (
					commentsCount
				) : (
					<Warning>
						{ __( 'Post Comments Count block: post not found.' ) }
					</Warning>
				) }
			</div>
		</>
	);
}
