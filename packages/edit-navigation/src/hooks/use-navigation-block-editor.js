/**
 * WordPress dependencies
 */
import { useDispatch } from '@aarondewes/wp-data';
import { useCallback } from '@aarondewes/wp-element';
import { useEntityBlockEditor } from '@aarondewes/wp-core-data';

/**
 * Internal dependencies
 */
import { NAVIGATION_POST_KIND, NAVIGATION_POST_POST_TYPE } from '../constants';
import { store as editNavigationStore } from '../store';

export default function useNavigationBlockEditor( post ) {
	const { createMissingMenuItems } = useDispatch( editNavigationStore );

	const [ blocks, onInput, onEntityChange ] = useEntityBlockEditor(
		NAVIGATION_POST_KIND,
		NAVIGATION_POST_POST_TYPE,
		{
			id: post?.id,
		}
	);

	const onChange = useCallback(
		async ( ...args ) => {
			await onEntityChange( ...args );
			createMissingMenuItems( post );
		},
		[ onEntityChange, post ]
	);

	return [ blocks, onInput, onChange ];
}
