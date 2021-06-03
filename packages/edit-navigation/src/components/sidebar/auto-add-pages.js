/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { ToggleControl } from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import { useMenuEntityProp } from '../../hooks';

export default function AutoAddPages( { menuId } ) {
	const [ autoAddPages, setAutoAddPages ] = useMenuEntityProp(
		'auto_add',
		menuId
	);

	return (
		<ToggleControl
			label={ __( 'Add new pages' ) }
			help={ __(
				'Automatically add published top-level pages to this menu.'
			) }
			checked={ autoAddPages ?? false }
			onChange={ setAutoAddPages }
		/>
	);
}
