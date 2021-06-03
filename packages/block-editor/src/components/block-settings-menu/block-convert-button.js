/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { MenuItem } from '@aarondewes/wp-components';

export default function BlockConvertButton( { shouldRender, onClick, small } ) {
	if ( ! shouldRender ) {
		return null;
	}

	const label = __( 'Convert to Blocks' );
	return <MenuItem onClick={ onClick }>{ ! small && label }</MenuItem>;
}
