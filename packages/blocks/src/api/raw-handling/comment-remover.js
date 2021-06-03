/**
 * WordPress dependencies
 */
import { remove } from '@aarondewes/wp-dom';

/**
 * Looks for comments, and removes them.
 *
 * @param {Node} node The node to be processed.
 * @return {void}
 */
export default function commentRemover( node ) {
	if ( node.nodeType === node.COMMENT_NODE ) {
		remove( node );
	}
}
