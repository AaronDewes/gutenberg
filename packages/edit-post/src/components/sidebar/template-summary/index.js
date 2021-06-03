/**
 * WordPress dependencies
 */
import { Icon, layout } from '@aarondewes/wp-icons';
import { useSelect } from '@aarondewes/wp-data';
import { Flex, FlexItem, FlexBlock, PanelBody } from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

function TemplateSummary() {
	const template = useSelect( ( select ) => {
		const { getEditedPostTemplate } = select( editPostStore );
		return getEditedPostTemplate();
	}, [] );

	if ( ! template ) {
		return null;
	}

	return (
		<PanelBody>
			<Flex align="flex-start">
				<FlexItem>
					<Icon icon={ layout } />
				</FlexItem>

				<FlexBlock>
					<h2 className="edit-post-template-summary__title">
						{ template?.title || template?.slug }
					</h2>
					<p>{ template?.description }</p>
				</FlexBlock>
			</Flex>
		</PanelBody>
	);
}

export default TemplateSummary;
