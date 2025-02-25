/**
 * External dependencies
 */
import { get, omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Component } from '@aarondewes/wp-element';
import {
	Button,
	Spinner,
	CheckboxControl,
	withFocusReturn,
	withConstrainedTabbing,
} from '@aarondewes/wp-components';
import { withSelect, withDispatch } from '@aarondewes/wp-data';
import { compose } from '@aarondewes/wp-compose';
import { closeSmall } from '@aarondewes/wp-icons';
import { store as coreStore } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import PostPublishButton from '../post-publish-button';
import PostPublishPanelPrepublish from './prepublish';
import PostPublishPanelPostpublish from './postpublish';
import { store as editorStore } from '../../store';

export class PostPublishPanel extends Component {
	constructor() {
		super( ...arguments );
		this.onSubmit = this.onSubmit.bind( this );
	}

	componentDidUpdate( prevProps ) {
		// Automatically collapse the publish sidebar when a post
		// is published and the user makes an edit.
		if (
			prevProps.isPublished &&
			! this.props.isSaving &&
			this.props.isDirty
		) {
			this.props.onClose();
		}
	}

	onSubmit() {
		const { onClose, hasPublishAction, isPostTypeViewable } = this.props;
		if ( ! hasPublishAction || ! isPostTypeViewable ) {
			onClose();
		}
	}

	render() {
		const {
			forceIsDirty,
			forceIsSaving,
			isBeingScheduled,
			isPublished,
			isPublishSidebarEnabled,
			isScheduled,
			isSaving,
			onClose,
			onTogglePublishSidebar,
			PostPublishExtension,
			PrePublishExtension,
			...additionalProps
		} = this.props;
		const propsForPanel = omit( additionalProps, [
			'hasPublishAction',
			'isDirty',
			'isPostTypeViewable',
		] );
		const isPublishedOrScheduled =
			isPublished || ( isScheduled && isBeingScheduled );
		const isPrePublish = ! isPublishedOrScheduled && ! isSaving;
		const isPostPublish = isPublishedOrScheduled && ! isSaving;
		return (
			<div className="editor-post-publish-panel" { ...propsForPanel }>
				<div className="editor-post-publish-panel__header">
					{ isPostPublish ? (
						<Button
							onClick={ onClose }
							icon={ closeSmall }
							label={ __( 'Close panel' ) }
						/>
					) : (
						<>
							<div className="editor-post-publish-panel__header-publish-button">
								<PostPublishButton
									focusOnMount={ true }
									onSubmit={ this.onSubmit }
									forceIsDirty={ forceIsDirty }
									forceIsSaving={ forceIsSaving }
								/>
							</div>
							<div className="editor-post-publish-panel__header-cancel-button">
								<Button onClick={ onClose } variant="secondary">
									{ __( 'Cancel' ) }
								</Button>
							</div>
						</>
					) }
				</div>
				<div className="editor-post-publish-panel__content">
					{ isPrePublish && (
						<PostPublishPanelPrepublish>
							{ PrePublishExtension && <PrePublishExtension /> }
						</PostPublishPanelPrepublish>
					) }
					{ isPostPublish && (
						<PostPublishPanelPostpublish focusOnMount={ true }>
							{ PostPublishExtension && <PostPublishExtension /> }
						</PostPublishPanelPostpublish>
					) }
					{ isSaving && <Spinner /> }
				</div>
				<div className="editor-post-publish-panel__footer">
					<CheckboxControl
						label={ __( 'Always show pre-publish checks.' ) }
						checked={ isPublishSidebarEnabled }
						onChange={ onTogglePublishSidebar }
					/>
				</div>
			</div>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getPostType } = select( coreStore );
		const {
			getCurrentPost,
			getEditedPostAttribute,
			isCurrentPostPublished,
			isCurrentPostScheduled,
			isEditedPostBeingScheduled,
			isEditedPostDirty,
			isSavingPost,
		} = select( editorStore );
		const { isPublishSidebarEnabled } = select( editorStore );
		const postType = getPostType( getEditedPostAttribute( 'type' ) );

		return {
			hasPublishAction: get(
				getCurrentPost(),
				[ '_links', 'wp:action-publish' ],
				false
			),
			isPostTypeViewable: get( postType, [ 'viewable' ], false ),
			isBeingScheduled: isEditedPostBeingScheduled(),
			isDirty: isEditedPostDirty(),
			isPublished: isCurrentPostPublished(),
			isPublishSidebarEnabled: isPublishSidebarEnabled(),
			isSaving: isSavingPost(),
			isScheduled: isCurrentPostScheduled(),
		};
	} ),
	withDispatch( ( dispatch, { isPublishSidebarEnabled } ) => {
		const { disablePublishSidebar, enablePublishSidebar } = dispatch(
			editorStore
		);
		return {
			onTogglePublishSidebar: () => {
				if ( isPublishSidebarEnabled ) {
					disablePublishSidebar();
				} else {
					enablePublishSidebar();
				}
			},
		};
	} ),
	withFocusReturn,
	withConstrainedTabbing,
] )( PostPublishPanel );
