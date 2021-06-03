/**
 * WordPress dependencies
 */

import { ToolbarButton } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';
import { rotateRight as rotateRightIcon } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import { useImageEditingContext } from './context';

export default function RotationButton() {
	const { isInProgress, rotateClockwise } = useImageEditingContext();
	return (
		<ToolbarButton
			icon={ rotateRightIcon }
			label={ __( 'Rotate' ) }
			onClick={ rotateClockwise }
			disabled={ isInProgress }
		/>
	);
}
