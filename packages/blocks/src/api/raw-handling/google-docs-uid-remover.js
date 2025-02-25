/**
 * WordPress dependencies
 */
import { unwrap } from '@aarondewes/wp-dom';

export default function googleDocsUIdRemover( node ) {
	if ( ! node.id || node.id.indexOf( 'docs-internal-guid-' ) !== 0 ) {
		return;
	}

	unwrap( node );
}
