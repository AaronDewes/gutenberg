/**
 * WordPress dependencies
 */
import { ToolbarButton } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

/**
 * Internal dependencies
 */
import { useImageEditingContext } from './context';

export default function FormControls() {
	const { isInProgress, apply, cancel } = useImageEditingContext();
	return (
		<>
			<ToolbarButton onClick={ apply } disabled={ isInProgress }>
				{ __( 'Apply' ) }
			</ToolbarButton>
			<ToolbarButton onClick={ cancel }>{ __( 'Cancel' ) }</ToolbarButton>
		</>
	);
}
