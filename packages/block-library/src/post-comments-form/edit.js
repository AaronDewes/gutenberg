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
import { useEntityProp } from '@aarondewes/wp-core-data';
import { __ } from '@aarondewes/wp-i18n';

export default function PostCommentsFormEdit( {
	attributes,
	context,
	setAttributes,
} ) {
	const { textAlign } = attributes;
	const { postId, postType } = context;
	const [ commentStatus ] = useEntityProp(
		'postType',
		postType,
		'comment_status',
		postId
	);
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

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
				{ ! commentStatus && (
					<Warning>
						{ __(
							'Post Comments Form block: comments are not enabled for this post type.'
						) }
					</Warning>
				) }

				{ 'open' !== commentStatus && (
					<Warning>
						{ __(
							'Post Comments Form block: comments to this post are not allowed.'
						) }
					</Warning>
				) }

				{ 'open' === commentStatus && __( 'Post Comments Form' ) }
			</div>
		</>
	);
}
