/**
 * WordPress dependencies
 */
import { __, sprintf } from '@aarondewes/wp-i18n';
import { RawHTML } from '@aarondewes/wp-element';
import { Button } from '@aarondewes/wp-components';
import { getBlockType, createBlock } from '@aarondewes/wp-blocks';
import { withDispatch } from '@aarondewes/wp-data';
import {
	Warning,
	useBlockProps,
	store as blockEditorStore,
} from '@aarondewes/wp-block-editor';

function MissingBlockWarning( { attributes, convertToHTML } ) {
	const { originalName, originalUndelimitedContent } = attributes;
	const hasContent = !! originalUndelimitedContent;
	const hasHTMLBlock = getBlockType( 'core/html' );

	const actions = [];
	let messageHTML;
	if ( hasContent && hasHTMLBlock ) {
		messageHTML = sprintf(
			/* translators: %s: block name */
			__(
				'Your site doesn’t include support for the "%s" block. You can leave this block intact, convert its content to a Custom HTML block, or remove it entirely.'
			),
			originalName
		);
		actions.push(
			<Button key="convert" onClick={ convertToHTML } variant="primary">
				{ __( 'Keep as HTML' ) }
			</Button>
		);
	} else {
		messageHTML = sprintf(
			/* translators: %s: block name */
			__(
				'Your site doesn’t include support for the "%s" block. You can leave this block intact or remove it entirely.'
			),
			originalName
		);
	}

	return (
		<div { ...useBlockProps( { className: 'has-warning' } ) }>
			<Warning actions={ actions }>{ messageHTML }</Warning>
			<RawHTML>{ originalUndelimitedContent }</RawHTML>
		</div>
	);
}

const MissingEdit = withDispatch( ( dispatch, { clientId, attributes } ) => {
	const { replaceBlock } = dispatch( blockEditorStore );
	return {
		convertToHTML() {
			replaceBlock(
				clientId,
				createBlock( 'core/html', {
					content: attributes.originalUndelimitedContent,
				} )
			);
		},
	};
} )( MissingBlockWarning );

export default MissingEdit;
