/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Spinner } from '@aarondewes/wp-components';

const EmbedLoading = () => (
	<div className="wp-block-embed is-loading">
		<Spinner />
		<p>{ __( 'Embedding…' ) }</p>
	</div>
);

export default EmbedLoading;
