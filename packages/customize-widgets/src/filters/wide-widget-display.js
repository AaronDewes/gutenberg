/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@aarondewes/wp-compose';
import { addFilter } from '@aarondewes/wp-hooks';

const { wp } = window;

const withWideWidgetDisplay = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { idBase } = props.attributes;
		const isWide =
			wp.customize.Widgets.data.availableWidgets.find(
				( widget ) => widget.id_base === idBase
			)?.is_wide ?? false;

		return <BlockEdit { ...props } isWide={ isWide } />;
	},
	'withWideWidgetDisplay'
);

addFilter(
	'editor.BlockEdit',
	'core/customize-widgets/wide-widget-display',
	withWideWidgetDisplay
);
