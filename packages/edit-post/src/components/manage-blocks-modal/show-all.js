/**
 * WordPress dependencies
 */
import { useInstanceId } from '@aarondewes/wp-compose';
import { FormToggle } from '@aarondewes/wp-components';
import { __ } from '@aarondewes/wp-i18n';

export default function BlockManagerShowAll( { checked, onChange } ) {
	const instanceId = useInstanceId( BlockManagerShowAll );
	const id = 'edit-post-manage-blocks-modal__show-all-' + instanceId;

	return (
		<div className="edit-post-manage-blocks-modal__show-all">
			<label
				htmlFor={ id }
				className="edit-post-manage-blocks-modal__show-all-label"
			>
				{
					/* translators: Checkbox toggle label */
					__( 'Show section' )
				}
			</label>
			<FormToggle
				id={ id }
				checked={ checked }
				onChange={ ( event ) => onChange( event.target.checked ) }
			/>
		</div>
	);
}
