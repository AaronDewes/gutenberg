/**
 * WordPress dependencies
 */
import {
	DropdownMenu,
	MenuGroup,
	MenuItemsChoice,
	ToolbarGroup,
	ToolbarItem,
} from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { moveTo } from '@aarondewes/wp-icons';

export default function MoveToWidgetArea( {
	currentWidgetAreaId,
	widgetAreas,
	onSelect,
} ) {
	return (
		<ToolbarGroup>
			<ToolbarItem>
				{ ( toggleProps ) => (
					<DropdownMenu
						icon={ moveTo }
						label={ __( 'Move to widget area' ) }
						toggleProps={ toggleProps }
					>
						{ ( { onClose } ) => (
							<MenuGroup label={ __( 'Move to' ) }>
								<MenuItemsChoice
									choices={ widgetAreas.map(
										( widgetArea ) => ( {
											value: widgetArea.id,
											label: widgetArea.name,
											info: widgetArea.description,
										} )
									) }
									value={ currentWidgetAreaId }
									onSelect={ ( value ) => {
										onSelect( value );
										onClose();
									} }
								/>
							</MenuGroup>
						) }
					</DropdownMenu>
				) }
			</ToolbarItem>
		</ToolbarGroup>
	);
}
