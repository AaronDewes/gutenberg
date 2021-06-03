/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';

export default function NoPreview( { name } ) {
	return (
		<div className="wp-block-legacy-widget__edit-no-preview">
			{ name && <h3>{ name }</h3> }
			<p>{ __( 'No preview available.' ) }</p>
		</div>
	);
}
