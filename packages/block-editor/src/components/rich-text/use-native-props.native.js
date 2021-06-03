/**
 * WordPress dependencies
 */
import { useContext } from '@aarondewes/wp-element';

/**
 * Internal dependencies
 */
import { OnCaretVerticalPositionChange } from '../block-list';

export function useNativeProps() {
	return {
		onCaretVerticalPositionChange: useContext(
			OnCaretVerticalPositionChange
		),
	};
}
