/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@aarondewes/wp-data';
import {
	AlignmentControl,
	BlockControls,
	Warning,
	useBlockProps,
} from '@aarondewes/wp-block-editor';
import { __ } from '@aarondewes/wp-i18n';
import { RawHTML } from '@aarondewes/wp-element';
import { store as coreStore } from '@aarondewes/wp-core-data';

function PostCommentsDisplay( { postId } ) {
	return useSelect(
		( select ) => {
			const comments = select( coreStore ).getEntityRecords(
				'root',
				'comment',
				{
					post: postId,
				}
			);
			// TODO: "No Comments" placeholder should be editable.
			return comments && comments.length
				? comments.map( ( comment ) => (
						<RawHTML
							className="wp-block-post-comments__comment"
							key={ comment.id }
						>
							{ comment.content.rendered }
						</RawHTML>
				  ) )
				: __( 'No comments.' );
		},
		[ postId ]
	);
}

export default function PostCommentsEdit( {
	attributes,
	setAttributes,
	context,
} ) {
	const { postType, postId } = context;
	const { textAlign } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	if ( ! postType || ! postId ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __( 'Post comments block: no post found.' ) }
				</Warning>
			</div>
		);
	}

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
				<PostCommentsDisplay postId={ postId } />
			</div>
		</>
	);
}
