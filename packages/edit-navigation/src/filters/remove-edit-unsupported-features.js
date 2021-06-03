/**
 * WordPress dependencies
 */
import { addFilter } from '@aarondewes/wp-hooks';
import { createHigherOrderComponent } from '@aarondewes/wp-compose';

const removeNavigationBlockEditUnsupportedFeatures = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( props.name !== 'core/navigation' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<BlockEdit
				{ ...props }
				hasSubmenuIndicatorSetting={ false }
				hasItemJustificationControls={ false }
			/>
		);
	},
	'removeNavigationBlockEditUnsupportedFeatures'
);

export default () =>
	addFilter(
		'editor.BlockEdit',
		'core/edit-navigation/remove-navigation-block-edit-unsupported-features',
		removeNavigationBlockEditUnsupportedFeatures
	);
