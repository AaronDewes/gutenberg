/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { useBlockProps } from '@aarondewes/wp-block-editor';

export default function NextPageEdit() {
	return (
		<div { ...useBlockProps() }>
			<div className="wp-block-nextpage">
				<span>{ __( 'Page break' ) }</span>
			</div>
		</div>
	);
}
