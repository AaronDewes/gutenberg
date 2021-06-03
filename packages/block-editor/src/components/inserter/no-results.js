/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Icon, blockDefault } from '@aarondewes/wp-icons';

function InserterNoResults() {
	return (
		<div className="block-editor-inserter__no-results">
			<Icon
				className="block-editor-inserter__no-results-icon"
				icon={ blockDefault }
			/>
			<p>{ __( 'No results found.' ) }</p>
		</div>
	);
}

export default InserterNoResults;
