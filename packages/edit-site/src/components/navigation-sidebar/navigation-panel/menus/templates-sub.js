/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __experimentalNavigationMenu as NavigationMenu } from '@aarondewes/wp-components';
import { useMemo } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import TemplateNavigationItem from '../template-navigation-item';
import { MENU_TEMPLATES } from '../constants';

export default function TemplatesSubMenu( { menu, title, templates } ) {
	const templatesFiltered = useMemo(
		() =>
			templates
				?.filter( ( { location } ) => location === menu )
				?.map( ( { template } ) => template ) ?? [],
		[ menu, templates ]
	);

	return (
		<NavigationMenu
			menu={ menu }
			title={ title }
			parentMenu={ MENU_TEMPLATES }
			isEmpty={ templatesFiltered.length === 0 }
		>
			{ map( templatesFiltered, ( template ) => (
				<TemplateNavigationItem
					item={ template }
					key={ `wp_template-${ template.id }` }
				/>
			) ) }
		</NavigationMenu>
	);
}
