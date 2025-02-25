/**
 * WordPress dependencies
 */
import { withSelect } from '@aarondewes/wp-data';
import { __ } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import { __unstableUseBlockRef as useBlockRef } from '../block-list/use-block-props/use-block-refs';

const SkipToSelectedBlock = ( { selectedBlockClientId } ) => {
	const ref = useBlockRef( selectedBlockClientId );
	const onClick = () => {
		ref.current.focus();
	};

	return selectedBlockClientId ? (
		<Button
			variant="secondary"
			className="block-editor-skip-to-selected-block"
			onClick={ onClick }
		>
			{ __( 'Skip to the selected block' ) }
		</Button>
	) : null;
};

export default withSelect( ( select ) => {
	return {
		selectedBlockClientId: select(
			blockEditorStore
		).getBlockSelectionStart(),
	};
} )( SkipToSelectedBlock );
