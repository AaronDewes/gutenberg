/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { createInterpolateElement } from '@aarondewes/wp-element';
import { addQueryArgs } from '@aarondewes/wp-url';
import { createHigherOrderComponent } from '@aarondewes/wp-compose';
import { InspectorControls } from '@aarondewes/wp-block-editor';

const CreateNewPostLink = ( {
	attributes: { query: { postType } = {} } = {},
} ) => {
	if ( ! postType ) return null;
	const newPostUrl = addQueryArgs( 'post-new.php', {
		post_type: postType,
	} );
	return (
		<div className="wp-block-query__create-new-link">
			{ createInterpolateElement(
				__( '<a>Create a new post</a> for this feed.' ),
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				{ a: <a href={ newPostUrl } /> }
			) }
		</div>
	);
};

/**
 * Override the default edit UI to include layout controls
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */
const queryTopInspectorControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name, isSelected } = props;
		if ( name !== 'core/query' || ! isSelected ) {
			return <BlockEdit key="edit" { ...props } />;
		}

		return (
			<>
				<InspectorControls>
					<CreateNewPostLink { ...props } />
				</InspectorControls>
				<BlockEdit key="edit" { ...props } />
			</>
		);
	},
	'withInspectorControls'
);

export default queryTopInspectorControls;
